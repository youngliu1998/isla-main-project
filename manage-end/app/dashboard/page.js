'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { User } from 'lucide-react'
import { useAuth } from '@/hook/use-auth'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import './_style/dashboard.css'

export function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <>{time}</>
}

export default function page() {
  const router = useRouter()
  const { user, isAuth } = useAuth()
  useEffect(() => {
    if (!isAuth) {
      router.push('/member/login')
    }
  }, [isAuth, router])
  if (!isAuth) return null
  const user_id = user?.id || '錯誤'
  const nickname = user?.nickname || '錯誤'
  const email = user?.email || '錯誤'

  return (
    <div className="dashboard-container">
      <Card className="shadow-xl rounded-2xl py-10">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-orange-600">
            ISLA 管理平台
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mt-6 flex-col w-full">
            <div className="clock text-muted-foreground">
              現在時間：
              <Clock />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xl text-muted-foreground">
                登入的使用者： {nickname} {email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
