'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAuth } from '@/hook/use-auth'
import { USER_AVA_URL } from '@/_route/img-url'
import './add-review-form'

export default function AddReviewForm({ courseID, onReviewAdded }) {
  const { user } = useAuth()
  const [star, setStar] = useState(5)
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return alert('請輸入評價內容')
    if (!user) return alert('請先登入')

    setSubmitting(true)
    const token = localStorage.getItem('jwtToken')
    try {
      const res = await fetch(`http://localhost:3005/api/course/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({
          course_id: courseID,
          star: star,
          content: content,
          member_id: user.id,
        }),
      })

      if (!res.ok) throw new Error('送出失敗')
      const data = await res.json()
      onReviewAdded(data.data)
      setContent('')
      setStar(5)
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="my-5">
      <div className="d-flex justify-content-between">
        <div className="col d-flex">
          <Image
            src={
              user?.ava_url
                ? USER_AVA_URL + user.ava_url
                : USER_AVA_URL + 'default-avatar.jpg'
            }
            alt="學員圖片"
            width={40}
            height={40}
            className="img-fluid box5-comment-author"
          />
          <h5 className="m-2 my-auto">
            {user?.name || '匿名用戶'} <span>新增一則評價</span>
          </h5>
        </div>

        <div className="m-2">
          <label className="form-label me-2">星等：</label>
          <select
            className="form-select d-inline w-auto"
            value={star}
            onChange={(e) => setStar(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((s) => (
              <option key={s} value={s}>
                {s} 星
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <textarea
          className="form-control my-2"
          placeholder="請輸入你的評價內容..."
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="text-end">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? '送出中...' : '送出評價'}
        </button>
      </div>
    </form>
  )
}
