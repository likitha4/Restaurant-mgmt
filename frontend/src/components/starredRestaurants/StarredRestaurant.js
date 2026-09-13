import React, { useState } from "react";
import {
  Card,
  CardButton,
  CardButtons,
  CardDescription,
  CardTitle,
  EditFields,
} from "../restaurants/RestaurantCardStyles";
import { FieldGroup, FieldInput, FieldLabel } from "../restaurants/RestaurantFormStyles";

const StarredRestaurant = React.memo(
  ({ restaurant, onUnstarRestaurant, onUpdateComment }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState(restaurant.comment || "");

    const onCancelEdit = () => {
      setComment(restaurant.comment || "");
      setIsEditing(false);
    };

    const onSaveComment = async () => {
      await onUpdateComment(restaurant.restaurant_id, comment);
      setIsEditing(false);
    };

    return (
      <Card>
        <CardTitle>{restaurant.name}</CardTitle>
        {isEditing ? (
          <EditFields>
            <FieldGroup>
              <FieldLabel htmlFor={`comment-${restaurant.restaurant_id}`}>
                Comment
              </FieldLabel>
              <FieldInput
                id={`comment-${restaurant.restaurant_id}`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FieldGroup>
          </EditFields>
        ) : (
          <CardDescription>{comment}</CardDescription>
        )}
        <CardButtons>
          <CardButton
            onClick={() =>
              isEditing ? onCancelEdit() : setIsEditing(true)
            }
          >
            {isEditing ? "Cancel" : "Edit Comment"}
          </CardButton>
          {isEditing && <CardButton onClick={onSaveComment}>Save</CardButton>}
          <CardButton
            onClick={() => onUnstarRestaurant(restaurant.restaurant_id)}
          >
            Unstar
          </CardButton>
        </CardButtons>
      </Card>
    );
  },
);

export default StarredRestaurant;
