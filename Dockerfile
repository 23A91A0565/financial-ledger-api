# 1️⃣ Use official Node.js LTS image (lightweight)
FROM node:20-alpine

# 2️⃣ Set working directory inside the container
WORKDIR /app

# 3️⃣ Copy package.json and package-lock.json first
# (this helps Docker cache dependencies)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install --production

# 5️⃣ Copy the rest of the application code
COPY . .

# 6️⃣ Expose the port your app runs on
EXPOSE 3000

# 7️⃣ Command to start the application
CMD ["node", "src/app.js"]
