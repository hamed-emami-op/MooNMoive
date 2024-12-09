# از تصویر Node استفاده می‌کنیم
FROM node:16

# ایجاد دایرکتوری برای پروژه داخل کانتینر
WORKDIR /app

# کپی کردن فایل‌های پروژه به کانتینر
COPY . .

# نصب وابستگی‌ها
RUN npm install

# ساخت نسخه تولیدی (Production Build)
RUN npm run build

# نصب ابزار serve برای سرو کردن فایل‌ها
RUN npm install -g serve

# فرمان شروع کانتینر
CMD ["serve", "-s", "dist"]

# پورت 3000 را باز می‌کنیم
EXPOSE 3000