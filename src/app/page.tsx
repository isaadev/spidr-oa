'use client';
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    guess: "",
    pin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "pin") {
      formattedValue = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1-").slice(0, 19);
    }

    setForm({ ...form, [name]: formattedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const isPhoneValid = /^\d+$/.test(form.phone);

    if (!isEmailValid) {
      alert("Please enter a valid email.");
      return;
    }
    if (!isPhoneValid) {
      alert("Phone number must contain only digits.");
      return;
    }
    console.log(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      {/* maybe this color for text B9BCC3  + motion form so it pops up on reload */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        // 479dafe6
        className="bg-[#1C1D1E] text-white w-full max-w-xl p-8 rounded-xl space-y-6 shadow-lg"
      >
        <Image
          src="/spidr-logo.png"
          alt="Spidr logo"
          width={60}
          height={60}
          className="mx-auto mb-4"
        />


        <h3 className="text-2xl text-center">Air Fryer Interest Form</h3>

        {/* first and last name on same line */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} className="flex-1 p-1 text-white w-full bg-transparent border-0 border-b border-gray-500 focus:outline-none focus:border-[#479dafe6] placeholder-gray-500 transition-colors duration-300" required />
          <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} className="flex-1 p-1 text-white w-full bg-transparent border-0 border-b border-gray-500 focus:outline-none focus:border-[#479dafe6] placeholder-gray-500 transition-colors duration-300" required />
        </div>

        {/* remaining fields */}
        <div className="space-y-4">
          <input type="tel"  name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} className="w-full p-1 bg-transparent border-0 border-b border-gray-500 focus:outline-none focus:border-[#479dafe6] placeholder-gray-500 transition-colors duration-300" required />
          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full p-1 mb-6 bg-transparent border-0 border-b border-gray-500 focus:outline-none focus:border-[#479dafe6] placeholder-gray-500 transition-colors duration-300" required />
          <input type="number" name="guess" placeholder="Guess the Air Fryer’s Cost ($)" value={form.guess} onChange={handleChange} className="w-full p-1  bg-transparent border-0 border-b border-gray-500 focus:outline-none focus:border-[#479dafe6] placeholder-gray-500 transition-colors duration-300" required />
          <input name="pin" placeholder="####-####-####-####" value={form.pin} onChange={handleChange} maxLength={19} className="w-full p-1 mb-4 bg-transparent border-0 border-b border-gray-500 focus:outline-none placeholder-gray-500 focus:border-[#479dafe6] transition-colors duration-300 text-white tracking-widest" required />
        </div>

        <button type="submit" className="w-full bg-[#479dafe6] text-white py-3 rounded active:text-sm hover:bg-[#1C1D1E] hover:text-[#479dafe6] hover:border-[1px] hover:border-[#479dafe6]  transition-all duration-250">Submit</button>
      </motion.form>
    </div>
  );
}
