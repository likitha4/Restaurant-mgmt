import React, { useState, useEffect } from "react";
import {
  Card,
  CardAddress,
  CardButton,
  CardButtons,
  CardDescription,
  CardTitle,
  EditFields,
} from "./RestaurantCardStyles";
import { FieldGroup, FieldInput, FieldLabel } from "./RestaurantFormStyles";
const Restaurant = React.memo(
  ({
    restaurant,
    isOwner,
    onDeleteRestaurant,
    onStarRestaurant,
    onUpdateRestaurant,
    style
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(restaurant.name);
    const [address, setAddress] = useState(restaurant.address);
    const [description, setDescription] = useState(restaurant.description);

    useEffect(() => {
      if (!isEditing) {
        setName(restaurant.name);
        setAddress(restaurant.address);
        setDescription(restaurant.description);
      }
    }, [isEditing, restaurant]);

    const onSaveNameChange = async () => {
      onUpdateRestaurant(restaurant.id, { name, address, description });
      setIsEditing(false);
    };

    return (
      <Card style={style}>
        {isEditing ? (
          <EditFields>
            <FieldGroup>
              <FieldLabel htmlFor={`name-${restaurant.id}`}>Name</FieldLabel>
              <FieldInput
                id={`name-${restaurant.id}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel htmlFor={`address-${restaurant.id}`}>
                Address
              </FieldLabel>
              <FieldInput
                id={`address-${restaurant.id}`}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldLabel htmlFor={`description-${restaurant.id}`}>
                Description
              </FieldLabel>
              <FieldInput
                id={`description-${restaurant.id}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FieldGroup>
          </EditFields>
        ) : (
          <>
            <CardTitle>{name}</CardTitle>
            <CardAddress>{address}</CardAddress>
            <CardDescription>{description}</CardDescription>
          </>
        )}
        <CardButtons>
          {isOwner && (
            <CardButton
              onClick={() => setIsEditing((previousState) => !previousState)}
            >
              {isEditing ? "Cancel " : "Edit"}
            </CardButton>
          )}
          {isEditing ? (
            <CardButton onClick={onSaveNameChange}> Save </CardButton>
          ) : (
            <>
              {isOwner && (
                <CardButton onClick={() => onDeleteRestaurant(restaurant.id)}>
                  Delete
                </CardButton>
              )}
              <CardButton onClick={() => onStarRestaurant(restaurant.id)}>
                Star
              </CardButton>
            </>
          )}
        </CardButtons>
      </Card>
    );
  },
);

export default Restaurant;
