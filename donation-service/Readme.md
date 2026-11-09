# Donation Service

Python GraphQL API for the donations feature of Fork Find. It shares Fork Find's PostgreSQL database, owns the `donations` table, and trusts the login token issued by the Node backend.

## API (`POST /graphql`)

Ownership is enforced in SQL through `restaurants.created_by`, and the user id always comes from the verified token.


## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export JWT_SECRET="same value as the Node backend"
uvicorn main:app --reload --port 8001
```

Open http://localhost:8001/graphql. Use a port other than the Node backend's.

## Deploy

Render web service with root directory `donation-service`, build command `pip install -r requirements.txt`, start command `uvicorn main:app --host 0.0.0.0 --port $PORT`.

## Known limitations

No accept flow yet, no migrations, no automated tests.
