'use client'

import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Mail, Phone, User, Lock } from 'lucide-react'

const iconMap = {
  email: <Mail className="w-4 h-4 mr-2 text-muted-foreground" />,
  phone: <Phone className="w-4 h-4 mr-2 text-muted-foreground" />,
  text: <User className="w-4 h-4 mr-2 text-muted-foreground" />,
  password: <Lock className="w-4 h-4 mr-2 text-muted-foreground" />,
}

export default function Form({ fields = [], onSubmit }) {
  const methods = useForm()
  const { register, handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl mx-auto p-6 bg-background rounded-md shadow-md grid gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {fields.map((field, index) => (
          <motion.div
            key={field.name}
            className="grid gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
              {field.label}
            </Label>
            <div className="relative flex items-center">
              {iconMap[field.type]}
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name, { required: field.required })}
                className="pl-10"
              />
            </div>
          </motion.div>
        ))}

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </motion.form>
    </FormProvider>
  )
}
