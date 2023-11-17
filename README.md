# express-auth-api
Implement nodemailer to sent password reset link and push notification to user email.

## Author

- **Author Name**
  - GitHub: [GitHub Username](https://github.com/amarafiif)
  - Instagram: [Instagram Username](https://instagram.com/amarafiif)
  - LinkedIn: [Connect with Me](www.linkedin.com/in/muhammad-ammar-afif-2b9741218)

## Dependencies i use
- ExpressJS
- PrismaJS
- PostgreSQL
- Bcrypt
- Cors
- Sentry
- Node Mailer

## How to install
1. Clone this repository
```bash
git clone https://github.com/amarafiif/express-auth.git
```

2. Install dependencies
```node
npm install
```
3. Configure .env
   You can copy from .env.example or copy this code
```env
PORT= 
DATABASE_URL= 

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER= 
EMAIL_PASSWORD= 

SENTRY_DSN=
```
4. Migrate prisma schema to project
```node
npx prisma migrate dev
```

6. Run this project
```node
npm run dev
```
![image](https://github.com/amarafiif/express-auth/assets/89902158/6ad049ec-f9b0-46da-86d1-95fed96bb040)
Akses localhost:3000 di browser anda, maka akan tampil halaman pendaftaran dan menampilkan pesan dari socket io

## Pict of my project
1. Register Page
![image](https://github.com/amarafiif/express-auth/assets/89902158/ec7eb58f-c4ed-4bfd-9650-82e59f7bc8ae)


2. Reset Password page
![image](https://github.com/amarafiif/express-auth/assets/89902158/72278bcc-0d8a-4579-8875-5f83e9fb2e96)


3. Set Password Page
![image](https://github.com/amarafiif/express-auth/assets/89902158/25dd0e86-3af8-49d4-b304-1ecd3a2c4bb6)


5. Validate Error Page
![image](https://github.com/amarafiif/express-auth/assets/89902158/ae4ed0c2-140d-41e9-96ef-c6000ed0f065)


6. Validate Success page
![image](https://github.com/amarafiif/express-auth/assets/89902158/5cd8c46b-862b-4825-aa81-a04a85b3de97)

