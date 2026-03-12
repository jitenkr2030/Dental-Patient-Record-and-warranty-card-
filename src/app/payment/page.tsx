'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Payment Processing</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-slate-600">
            Payment processing demo coming soon!
          </p>
          <Button className="w-full mt-4">
            Learn More
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}