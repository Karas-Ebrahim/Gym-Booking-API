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


