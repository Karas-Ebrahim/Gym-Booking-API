# Team Distribution

## 1. كاراس إبراهيم --- Authentication + Integration + Authorization

**مسؤوليّتي:** - Authentication - Authorization - Integration - و ال Integration أقصد بيه إن
كل أجزاء المشروع شغالة مع بعض وإن كل جزء بيخدم باقي أجزاء المشروع.

**Files:**

``` text
src/
├── models/
│   └── user.model.ts
├── controllers/
│   └── auth.controller.ts
├── routes/
│   └── auth.routes.ts
├── middleware/
│   ├── auth.middleware.ts
│   └── role.middleware.ts
└── utils/
    ├── jwt.ts
    └── password.ts
```

**Authentication:** - Register / Login - Password hashing 
`bcrypt` - JWT generation / verification - Protected routes

**Authorization:** ـ Role (`Member` / `Trainer`)


------------------------------------------------------------------------

## 2. يوسف شعبان --- Class Sessions

**مسؤوليّتك:**

``` text
src/
├── models/
│   └── classSession.model.ts
├── controllers/
│   └── classSession.controller.ts
└── routes/
    └── classSession.routes.ts
```

**CRUD Operations:**

### Trainer

``` text
POST   /api/classes
PATCH  /api/classes/:id
DELETE /api/classes/:id
```

### Public

``` text
GET /api/classes
GET /api/classes/:id
```

**Search / Filtering:** - `title` - `trainer` - `date` - `availability`

**Ownership:**

مثلاً:

``` text
Trainer A owns Class 123
```

لو:

``` text
Trainer B
PATCH /api/classes/123
```

يرجع:

``` text
403 Forbidden
```

يعني الـ Trainer يقدر يعدّل أو يحذف الـ Classes الخاصة بيه فقط.

------------------------------------------------------------------------

## 3. معاذ شعبان --- Bookings

**مسؤوليّتك:**

``` text
src/
├── models/
│   └── booking.model.ts
├── controllers/
│   └── booking.controller.ts
└── routes/
    └── booking.routes.ts
```

**Endpoints:**

### Member --- Create Booking

``` text
POST /api/bookings
```

### Member --- View My Bookings

``` text
GET /api/bookings/me
```

### Member --- Cancel My Booking

``` text
PATCH /api/bookings/:id/cancel
```

**Business Rules:** - Can't book a full class - Can't book the same
class twice - Can't cancel someone else's booking - Cancelled booking
frees a spot

------------------------------------------------------------------------

## 4. زياد طارق --- Validators

**مسؤوليّتك:**

``` text
src/
└── validators/
    ├── auth.validator.ts
    ├── classSession.validator.ts
    └── booking.validator.ts
```

**User Validation:** - Valid email - Strong password - Required fields

**Class Session Validation:** - `capacity > 0` - `startAt` must be in
the future - `endAt > startAt` - `title` is required

**Booking Validation:** - `session` is required

------------------------------------------------------------------------

# Shared / Final Integration Work

## Swagger

**مسؤولية مشتركة لمّا نخلّص المشروع إن شاء الله / Final Integration**

``` text
src/
└── config/
    └── swagger.ts
```

الـ API والـ endpoints والـ request/response examples.

## API Testing With Postman

**مسؤولية مشتركة / Final Integration**




Register / Login - Protected routes - Role-based access -
Class CRUD - Search / Filtering - Create Booking - Get My Bookings -
Cancel Booking - Business Rules - Validation errors - Authorization
errors

## README

و نعمل
``` text
README.md
```

بحيث يحتوي على: -
Project overview - Setup instructions - Environment
variables - API endpoints - Authentication - Roles & permissions -
Swagger documentation - Deployment URL - How to run locally

------------------------------------------------------------------------


# Final Responsibility Distribution
 
  -------------------------------------------------------------------------------
  Member                  Main Responsibility     Files
  ----------------------- ----------------------- -------------------------------
  **Karas Ebrahim:**      Authentication, Integration, Authorization         
                                                  `user.model.ts`,
                                                  `auth.controller.ts`,
                                                  `auth.routes.ts`,
                                                  `auth.middleware.ts`,
                                                  `role.middleware.ts`, `jwt.ts`,
                                                  `password.ts`

  **Youssef Shaban:**      Class Sessions         `classSession.model.ts`,
                                                  `classSession.controller.ts`,
                                                  `classSession.routes.ts`

  **Moaz Shapan:**         Bookings               `booking.model.ts`,
                                                  `booking.controller.ts`,
                                                  `booking.routes.ts`

  **Ziad Tarek:**          Validators             `auth.validator.ts`,
                                                  `classSession.validator.ts`,
                                                  `booking.validator.ts`

     
  -------------------------------------------------------------------------------

------------------------------------------------------------------------

# Important

التقسيمة دي **مش معناها إن كل واحد يشتغل بمعزل عن الباقي**.

كل جزء مرتبط بأجزاء تانية:

``` text
Authentication
      ↓
Authorization / Roles
      ↓
Class Sessions ←→ Bookings
      ↓
Validators
      ↓
Integration
      ↓
Swagger + Postman Testing
      ↓
Deployment
```

عشان كده كل عضو لازم يلتزم بالـ interfaces والـ field names والـ
endpoint conventions المتفق عليها بين الفريق، وأي تغيير في الـ Model أو
الـ API contract لازم يتقال للفريق قبل ما يتعمل.

