# 🏋️ مشروع الـ Gym Booking API

مساء الخير يا شباب، يارب تكونوا بخير ❤️

بالنسبة لمشروع ال Gym بتاعنا، المفروض إن التسليم هيبقى **يوم السبت الجاي 💀💀**، وفي الأغلب المناقشة هتبقى في نفس اليوم، فدلوقتي أنا هقولّكم كل واحد هيعمل إيه و يذاكر و يحضّر إزاي عشان معندناش وقت كثير.

طيب المشروع عبارة عن **جيم بينشر حصص أو سيشنز**، يعني بنحجز في الجيم من الآخر بس أونلاين، فالمطلوب مننا إننا نعمل جدول منظّم للمواعيد بتاعة التدريب والحجوزات و ننظم الحجوزات دي.

**بس كده 😂💀**

---

## 📋 الـ Requirements المطلوبة مننا

- Built with Node.js, TypeScript, and Express.js
- Connected to MongoDB using Mongoose, with at least 2 schemas/models
- Full CRUD operations on at least one resource
- User authentication — register and login endpoints - كانت في آخر سيشن
- Password hashing with bcrypt - كانت في آخر سيشن
- JWT-based authentication with protected routes - كانت في آخر سيشن
- At least one middleware (auth guard, logger, or validator)
- Environment variables managed with dotenv
- API documented with Swagger
- Deployed to a live cloud URL (Render / Railway) - كانت في آخر سيشن
- Source code pushed to a public GitHub repository

---

## 👥 مين هيستخدم الـ API إللي هنعمله؟ أو مين هما الـ Users؟

عندنا نوعين من الـ Users:

### 🏋️ الـ Trainer (الكوتش)

ده اللي بيدير الـ classes بتاعته:

- يعمل Register / Login.
- ينشئ ClassSession.
- يعدّل الـ class بتاعته.
- يحذف الـ class بتاعته.
- يشوف الـ bookings الخاصة بالـ classes بتاعته.
- ممنوع يعدّل أو يحذف classes بتاعة Trainer تاني.

يعني مثلًا:

> Ahmed → Trainer  
> Ahmed يعمل "CrossFit - Monday 6 PM" بسعة 20.

---

### 👤 الـ Member (المتدرب أو إللي هيشترك في الجيم)

ده الشخص اللي بيحجز في الـ classes.

- يعمل Register / Login.
- يشوف الـ classes المتاحة.
- يحجز مكان.
- يلغي الحجز بتاعه.
- ممنوع ينشئ أو يعدّل أو يحذف classes.

مثال:

> Mohamed → Member  
> يشوف CrossFit - Monday 6 PM → يضغط Book → بقى عنده Booking.

---

## 🏃‍♂️ الـ Classes

في أنواع للـ Classes، زي:

- Yoga
- CrossFit
- Boxing
- وهكذا

يعني كده هيبقى فيه **Interface لل User بالـ Role بتاعته** وواحدة ثانية للـ Classes، أنا بفكّر معاكم.

---

# 🗄️ الـ Models

الـ Models إللي المشروع قايم عليهم هم:

```text
User
ClassSession
Booking
```

**بس كده.**

### User

```ts
User {
    fullName: String,
    email: String,
    password: String, - هنعملّه Hashing بال bcrypt إللي في آخر سيشن
    role: "Member" | "Trainer"
}
```

### ClassSession

```ts
ClassSession {
    title: String,
    trainer: ObjectId,
    startAt: Date,
    endAt: Date,
    capacity: Number
}
```

### Booking

```ts
Booking {
    session: ObjectId,
    member: ObjectId,
    status: "booked" | "cancelled"
}
```

---

## 🔐 Authentication & Authorization

وفيه بقى الـ **Authentication**، و الـ **Authorization** إللي كانوا في آخر السيشن.

يعني إنت على حسب الـ **Role** بتاعتك هيبقى ليك صلاحيات خاصة بيك.

يعني الـ User مينفعش يدخل على User ثاني ويمسح الـ session بتاعته وهكذا، ونتحقق الأول من الهوية بتاعته في الـ Login.

---

# 🧠 قبل ما نبدأ في التقسيمة

كده إنتم فهمتم المشروع ككل وعرفتوا هنعمل إيه.

قبل بقى ما أقول التقسيمة أو إيه إللي هنعمله أو الـ Project Structure، لازم تعرفوا هنعمل كل ده إزاي 😂.

فطبعًا عندنا **السيشنز** و **حل الـ Hands On** و **حل التاسكات على اليوتيوب**.

فأهم السيشنات هي **الثالثة والرابعة** عشان دول إللي هنشتغل بيهم.

فخلال اليومين الجايين، **ذاكروا السيشنات دي**، وأهم حاجة معاهم الـ **Hands On والـ Task بإيديكم**.

ولو أصلًا إنتم مذاكرين و عملتوا التاسكات بإيديكم، فكده **حلو أوي**.

**خش على الـ Project Structure.**





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


