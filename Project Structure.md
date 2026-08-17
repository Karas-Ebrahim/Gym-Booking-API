
# 📁 Project Structure Without Explaining

```text
gym-booking-api/    
│
├── src/
│   │
│   ├── config/
│   │   ├── db.ts
│   │   └── swagger.ts
│   │
│   ├── models/
│   │   ├── user.model.ts
│   │   ├── classSession.model.ts
│   │   └── booking.model.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── classSession.controller.ts
│   │   └── booking.controller.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── classSession.routes.ts
│   │   └── booking.routes.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   
│   │   
│   │
│   ├── validators/
│   │   ├── auth.validator.ts
│   │   ├── classSession.validator.ts
│   │   └── booking.validator.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── password.ts
│   │
│   |
│   │   
│   │
│   └── server.ts
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```





# 📁 Project Structure With Explaining

```text
gym-booking-api/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.ts - مسؤول عن MongoDB و الاتصال بال Database
│   │   └── swagger.ts - ال UI
│   │
│   ├── models/ - ال Schemas
│   │   ├── user.model.ts - User Schema.
│   │   ├── classSession.model.ts - ClassSession Schema.
│   │   └── booking.model.ts - Booking Schema
│   │
│   ├── controllers/ - ال Logic كله
│   │   ├── auth.controller.ts - ال Login() و ال Register()
│   │   ├── classSession.controller.ts - فيه CreateClass() , GetClass() , DeleteClass() , UpdataClass() و هكذا
│   │   └── booking.controller.ts - فيه CreateBooking() , CancelBooking() , GetMyBookings()
│   │
│   ├── routes/ - الربط بالسيرفر
│   │   ├── auth.routes.ts - POST /api/auth/register و POST /api/auth/login
│   │   ├── classSession.routes.ts - GET /api/classes و GET /api/classes/:id و POST /api/classes و PATCH /api/classes/:id و DELETE /api/classes/:id و هكذا
│   │   └── booking.routes.ts - POST /api/bookings و GET /api/bookings/me و PATCH /api/bookings/:id/cancel
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts - Authorization وال Token
│   │   ├── role.middleware.ts - يحدد مين مسموح له
│   │
│   ├── validators/ - هنا التحقق من الـ input
│   │   ├── auth.validator.ts
│   │   ├── classSession.validator.ts
│   │   └── booking.validator.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts - Verify Token , Generate Token
│   │   └── password.ts - ال Hash و ال ComparePaswword
│   │
│   └── server.ts - إللي هنشغل منه السيرفر بتاعنا
│
├── .env - الباسووردز و عنوان ال داتا بيز
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

