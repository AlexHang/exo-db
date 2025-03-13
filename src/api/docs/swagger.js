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
              "description": "Exoplanet deleted successfully"
            }
          }
        }
      }
    },
    "components": {
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
        }
      }
    }
  }