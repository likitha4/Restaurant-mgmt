const crypto = require("crypto");
const pool = require("../db");
const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

const getSecret = () => process.env.JWT_SECRET || "restaurant-dev-secret";

const toBase64Url = (value) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

const sign = (value) =>
  crypto.createHmac("sha256", getSecret()).update(value).digest("base64url");

const hashPassword = (
  password,
  salt = crypto.randomBytes(16).toString("hex"),
) => {
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");

  return `${salt}:${hash}`;
};

const verifyPassword = (password, storedHash) => {
  const [salt, hash] = storedHash.split(":");
  const passwordHash = hashPassword(password, salt).split(":")[1];

  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(passwordHash));
};

const createToken = (user) => {
  const header = toBase64Url({ alg: "HS256", typ: "JWT" });
  const payload = toBase64Url({
    sub: user.id.toString(),
    name: user.name,
    email: user.email,
    exp: Date.now() + TOKEN_EXPIRY_MS,
  });
  const unsigned = `${header}.${payload}`;

  return `${unsigned}.${sign(unsigned)}`;
};

const verifyToken = (token) => {
  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    return null;
  }
  const expectedSignature = sign(`${header}.${payload}`);

  if (signature.length!==expectedSignature.length||
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  ) {
    return null;
  }

  const decoded = JSON.parse(
    Buffer.from(payload, "base64url").toString("utf8"),
  );

  if (decoded.exp < Date.now()) {
    return null;
  }

  return decoded;
};

const requireAuth = async (req, res, next) => {
 try{
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
  const user = await pool.query("select * from  users where id=$1", [
    decoded.sub,
  ]);
  if (user.rows.length === 0) {
    return res.status(401).json({ message: "User no longer exists" });
  }

  req.user = user.rows[0];
  next();
} catch(error){
return res.status(401).json({message:"Invalid token"});
}};

module.exports = {
  createToken,
  hashPassword,
  requireAuth,
  verifyPassword,
};
