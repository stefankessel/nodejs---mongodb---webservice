db.runCommand({
    collMod:'contacts',
    validator: {
      $jsonSchema: {
        bsonType: "object",
        title: "contacts",
        required: [
          "first_name",
          "last_name",
          "email",
          "isPublic",
          "users_id",
        ],
        properties: {
          first_name: {
            bsonType: "string",
          },
          last_name: {
            bsonType: "string",
          },
          email: {
            bsonType: "string",
          },
          
          addresses: {
            bsonType: "array",
            items: {
              title: "addresses",
              //required: ["street", "city", "postal_code"],
              properties: {
                street: {
                  bsonType: "string",
                },
                city: {
                  bsonType: "string",
                },
                postal_code: {
                  bsonType: "int",
                },
              },
            },
          },
          
          created_at: {
            bsonType: "date",
          },
          last_updated_at: {
            bsonType: "date",
          },
          isPublic: {
            bsonType: "bool",
          },
          
          users_id: {
            bsonType: 'objectId'
          }
          
        },
      },
    },
  });
  
  
  db.runCommand({
    collMod: 'users',
    validator: {
      $jsonSchema: {
        bsonType: "object",
        title: "users",
        required: ["username", "email", "password", "created_at"],
        properties: {
          username: {
            bsonType: "string",
          },
          email: {
            bsonType: "string",
          },
          password: {
            bsonType: "string",
          },
          created_at: {
            bsonType: "date",
          },
        },
      },
    },
  });
  
  db.getCollectionInfos({name: "users"})[0].options.validator
  
  