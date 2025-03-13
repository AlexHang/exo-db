export const swaggerConfig = {
  "openapi": "3.0.0",
  "info": {
    "title": "Exo-db",
    "description": "API for managing exoplanet data",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:5000/api",
      "description": "Development server"
    }
  ],
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    },
    "schemas": {
      "Exoplanet": {
        "type": "object",
        "properties": {
          "_id": {
            "type": "string"
          },
          "name": {
            "type": "string"
          },
          "distance": {
            "type": "number"
          },
          "discoveryYear": {
            "type": "integer"
          },
          "description": {
            "type": "string"
          },
          "imageUrl": {
            "type": "string"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "ExoplanetInput": {
        "type": "object",
        "required": ["name", "distance", "discoveryYear"],
        "properties": {
          "name": {
            "type": "string"
          },
          "distance": {
            "type": "number"
          },
          "discoveryYear": {
            "type": "integer"
          },
          "description": {
            "type": "string"
          },
          "imageUrl": {
            "type": "string"
          }
        }
      },
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "user-id"
          },
          "name": {
            "type": "string",
            "example": "John Doe"
          },
          "email": {
            "type": "string",
            "example": "john.doe@example.com"
          },
          "password": {
            "type": "string",
            "example": "password123"
          }
        }
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "paths": {
    "/exoplanets": {
      "get": {
        "summary": "Get all exoplanets",
        "responses": {
          "200": {
            "description": "A list of exoplanets",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Exoplanet"
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create a new exoplanet",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExoplanetInput"
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Exoplanet created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Exoplanet"
                }
              }
            }
          }
        }
      }
    },
    "/exoplanets/{id}": {
      "get": {
        "summary": "Get an exoplanet by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Exoplanet details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Exoplanet"
                }
              }
            }
          }
        }
      },
      "put": {
        "summary": "Update an exoplanet",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ExoplanetInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Exoplanet updated successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Exoplanet"
                }
              }
            }
          }
        }
      },
      "delete": {
        "summary": "Delete an exoplanet",
        "security": [
          {
            "bearerAuth": []
          }
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "204": {
            "description": "Exoplanet deleted successfully"
          }
        }
      }
    },
    "/auth/login": {
      "post": {
        "tags": ["Auth"],
        "summary": "Login a user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                    "example": "user@example.com"
                  },
                  "password": {
                    "type": "string",
                    "example": "password123"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful login",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "token": {
                      "type": "string",
                      "example": "jwt-token"
                    }
                  }
                }
              }
            }
          },
          "401": {
            "description": "Invalid credentials"
          }
        }
      }
    },
    "/auth/register": {
      "post": {
        "tags": ["Auth"],
        "summary": "Register a new user",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "John Doe"
                  },
                  "email": {
                    "type": "string",
                    "example": "john.doe@example.com"
                  },
                  "password": {
                    "type": "string",
                    "example": "password123"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User created successfully",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "user-id"
                    },
                    "name": {
                      "type": "string",
                      "example": "John Doe"
                    },
                    "email": {
                      "type": "string",
                      "example": "john.doe@example.com"
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "Invalid input"
          }
        }
      }
    }
  }
};
