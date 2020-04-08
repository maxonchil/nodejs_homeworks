define({ "api": [
  {
    "type": "patch",
    "url": "/:id/update",
    "title": "Update load",
    "name": "UpdateLoad",
    "group": "Load",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "LoadData",
            "description": "<p>New load data for update</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "payload example:",
        "content": "{ \"payload\": 100, \"dimensions\": {length: 100, width: 100, height: 100} }",
        "type": "Object"
      },
      {
        "title": "authorization header example:",
        "content": "{\n\"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
        "type": "Obect"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "SuccessResponce",
            "description": "<p>New load data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\nsuccess: true,\nstatus: 200,\ndata : {message:\"Load updated!\"},\nerror: null\n}",
          "type": "Object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Not Found\n{\n     success: false,\n     data: null,\n     error: { status: 400, message: \"Edit error! Can not edit this load!\" }\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/loads.router.js",
    "groupTitle": "Load"
  },
  {
    "type": "delete",
    "url": "/:id/delete",
    "title": "Delete load",
    "name": "deleteLoad",
    "group": "Load",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "authorization header example:",
        "content": "{\n\"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
        "type": "Obect"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "SuccessResponce",
            "description": "<p>Default</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\nsuccess: true,\nstatus:200,\ndata:null,\nerror: null\n}",
          "type": "Object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Error",
            "description": "<p>Load already assigned</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Not Found\n{\n     success: false,\n     data: null,\n     error: { status: 400, message: \"Delete error! Can not delete this load!\"}\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/loads.router.js",
    "groupTitle": "Load"
  },
  {
    "type": "put",
    "url": "/:id/update",
    "title": "Update truck name",
    "name": "UpdateTruck",
    "group": "Truck",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "TruckName",
            "description": "<p>New truck name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "New payload example:",
        "content": "{ updatedName:\"alahamora\"}",
        "type": "Object"
      },
      {
        "title": "authorization header example:",
        "content": "{\n\"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
        "type": "Obect"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "SuccessResponce",
            "description": "<p>Default</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\nsuccess: true,\nstatus: 200,\ndata : { message: \"Truck was updated!\"},\nerror: null\n}",
          "type": "Object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Not Found\n{\n     success: false,\n     data: null,\n     error: { status: 400, message: \"Edit trucks info is not posible now!\" }\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/trucks.router.js",
    "groupTitle": "Truck"
  },
  {
    "type": "delete",
    "url": "/:id/delete",
    "title": "Delete truck",
    "name": "deleteTruck",
    "group": "Truck",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "authorization header example: ",
        "content": "{\n\"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
        "type": "Obect"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "SuccessResponce",
            "description": "<p>Default</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\nsuccess: true,\nstatus:200,\ndata:null,\nerror: null\n}",
          "type": "Object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Error",
            "description": "<p>Truck is in status OL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Not Found\n{\n     success: false,\n     data: null,\n     error: { status: 400, message: \"Delete error! Can not delete this truck!\"}\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/trucks.router.js",
    "groupTitle": "Truck"
  },
  {
    "type": "put",
    "url": "/:id/add-email",
    "title": "Add email",
    "name": "AddEmail",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example payload example:",
        "content": "{ email:\"alahamora@gmail.com\"}",
        "type": "Object"
      },
      {
        "title": "Example authorization header example:",
        "content": "{\n\"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
        "type": "Obect"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "SuccessResponce",
            "description": "<p>Default</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\nsuccess: true,\nstatus: 200,\ndata : null,\nerror: null\n}",
          "type": "Object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Not Found\n{\n     success: false,\n     data: null,\n     error: { status: 400, message: \"Some error message\" }\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/user.router.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/:id/change-password",
    "title": "Change user password",
    "name": "ChangePassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Password",
            "description": "<p>New user password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "NewPassword payload example:",
        "content": "{ curentPassword:\"alahamora&&2&\", newPassword:\"someNewPass7@@799)_\"}",
        "type": "Object"
      },
      {
        "title": "authorization header example:",
        "content": "{\n\"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
        "type": "Obect"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "SuccessResponce",
            "description": "<p>Default</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\nsuccess: true,\nstatus: 200,\ndata : null,\nerror: null\n}",
          "type": "Object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Not Found\n{\n     success: false,\n     data: null,\n     error: { status: 400, message: \"Can not update user password\" }\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/user.router.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/delete",
    "title": "Delete user account and all user's data",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "authorization header example:",
        "content": "{\n\"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
        "type": "Obect"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "SuccessResponce",
            "description": "<p>Default</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\nsuccess: true,\nstatus: 200,\ndata : { message: \"User data was deleted!\"},\nerror: null\n}",
          "type": "Object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Not Found\n{\n     success: false,\n     data: null,\n     error: { status: 400, message: \"Can not delete user data!\" }\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/user.router.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/:id",
    "title": "Get user data",
    "name": "GetUserData",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "authorization header example:",
        "content": "{\n\"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
        "type": "Obect"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "SuccessResponce",
            "description": "<p>User data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\nsuccess: true,\nstatus: 200,\ndata : {\n username :\"Maxonchil\",\n email:\"maxonchil@gmail.com\",\n role:\"shipper\",\n customData:{loads:[]},\n avatar:null\n},\nerror: null\n}",
          "type": "Object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Not Found\n{\n     success: false,\n     data: null,\n     error: { status: 400, message: \"Some error message\" }\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/user.router.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/:id/reset-password",
    "title": "Generate new password and send it to user's email",
    "name": "ResetPassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "authorization header example:",
        "content": "{\n\"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
        "type": "Obect"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "SuccessResponce",
            "description": "<p>Default</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\nsuccess: true,\nstatus: 200,\ndata :null,\nerror: null\n}",
          "type": "Object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Error",
            "description": "<p>User has no email etc.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Not Found\n{\n     success: false,\n     data: null,\n     error: { status: 400, message: \"Can not reset user password\"}\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/user.router.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/:id/upload",
    "title": "Upload user's avatar",
    "name": "UploadAvatar",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "File",
            "description": "<p>File Object</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Avatar payload example:",
        "content": "{ avatar:\n         { name: '0F30DF89-0EEB-4DE4-B9AA-9E4C97C70A9C.jpg',\n          data: <Buffer >,\n           size: 2066488,\n           encoding: '7bit',\n           tempFilePath:\n           '/home/max/nodejs_homeworks/homework3/semi-uber/Server/tmp/tmp-1-1586368688356',\n           truncated: false,\n           mimetype: 'image/jpeg',\n           md5: '057d7a96764dbbd5e4ba57510fc4419e',\n           mv: [Function: mv] }\n        }",
        "type": "Object"
      },
      {
        "title": "authorization header example:",
        "content": "{\n\"Authorization\": \"JWT fnawilfmnaiwngainegnwegneiwngoiwe\"\n}",
        "type": "Obect"
      }
    ],
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Object",
            "optional": false,
            "field": "SuccessResponce",
            "description": "<p>Avatar URL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "HTTP/1.1 200 OK\n{\nsuccess: true,\nstatus: 200,\ndata : { avatar: \"http://res.cloudinary.com/dcktfttao/image/upload/v1586365521/fsst3r1zcnjvptfvehqo.jpg\"},\nerror: null\n}",
          "type": "Object"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Object",
            "optional": false,
            "field": "Error",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "    HTTP/1.1 400 Not Found\n{\n     success: false,\n     data: null,\n     error: { status: 400, message: \"Some error message\" }\n}",
          "type": "Object"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/routes/user.router.js",
    "groupTitle": "User"
  }
] });
