import { motion } from 'motion/react'
import { Button } from '../../components/blackButton'
import { Input } from '../../components/authPage/input'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { z } from 'zod'
import { useToaster, Message } from "rsuite";

const FormInput = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const page = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      when: 'beforeChildren',
      staggerChildren: 0.25,
    },
  },
}

const block = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const listItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
}

export function RegisterPage() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const toaster = useToaster();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  })

  const handleRegister = async () => {
    const result = FormInput.safeParse(formData);

    if (!result.success) {
      const formattedErrors: { [key: string]: string } = {};

      result.error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          const field = String(issue.path[0]);
          formattedErrors[field] = issue.message;

          // 🔔 show field-specific toast
          toaster.push(
            <Message type="error" showIcon closable>
              {issue.message}
            </Message>,
            { placement: 'topCenter', duration: 3000 }
          );
        }
      });

      setErrors(formattedErrors);
      return;
    }

    setErrors({});
    const { firstName, lastName, username, email, password } = result.data;

    const res = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username, email, password }),
    });

    if (!res.ok) {
      toaster.push(
        <Message type="error" showIcon closable>
          Registration failed 🚨
        </Message>,
        { placement: 'topCenter', duration: 3000 }
      );
      return;
    }

    toaster.push(
      <Message type="success" showIcon closable>
        Registration successful 🎉
      </Message>,
      { placement: 'topCenter', duration: 3000 }
    );

    navigate("/dashboard");
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col justify-center items-center"
      variants={page}
      initial="hidden"
      animate="show"
    >
      <motion.div className="max-w-[90vw] w-[90vw] pt-15" variants={block}>
        {/* Header */}
        <motion.div className="w-full flex flex-col justify-start pb-10" variants={block}>
          <h2 className="font-bold text-[40px]">Hey User</h2>
          <h3 className="text-[#999999] font-bold text-[40px]">Register</h3>
        </motion.div>

        {/* Content */}
        <motion.div className="pb-10" variants={block}>
          <motion.div className="text-[#777777] font-semibold w-[30%]" variants={block}>
            <p>
              Create your account to join and unlock more features. Please enter your desired
              username, email address, and a secure password to get started.
            </p>
            <br />
            <p>
              Your information is kept private and secure. After signing up, you can access
              exclusive resources and personalize your experience.
            </p>
          </motion.div>

          {/* Inputs */}
          <motion.div className="pt-7" variants={list}>
            <div className='flex'>
              <motion.div variants={listItem}>
                <Input placeholder="First Name" name="firstName" value={formData.firstName} onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                } />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </motion.div>
              <motion.div variants={listItem}>
                <Input placeholder="Last Name" name="lastName" value={formData.lastName} onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                } />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </motion.div>
            </div>
            <motion.div variants={listItem}>
              <Input placeholder="Username" name="username" value={formData.username} onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              } />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </motion.div>
            <motion.div variants={listItem}>
              <Input placeholder="Email" name="email" value={formData.email} onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              } />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </motion.div>
            <motion.div variants={listItem}>
              <Input placeholder="Password" name="password" value={formData.password} onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              } />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Button */}
        <motion.div variants={block}>
          <Button label="Sign Up" type="black" onClick={handleRegister} className='text-white w-[130px] h-[30px]' />
        </motion.div>

        {/* Footer */}
        <motion.div className="text-[#AAAAAA] font-medium pt-10" variants={block}>
          <p>© 2025</p>
          <p>All Rights Reserved</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
