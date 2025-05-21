'use client'

import React, { useState, useEffect } from 'react'
import MainForum from './main-forum'
import SubForum from './sub-forum'

export default function ForumSection(props) {
  return (
    <>
      <div className="row row-cols-lg-2 row-cols-1 gx-5 w-100">
        <MainForum
          number={1}
          forumTitle="新手也好用的遮瑕&遮瑕刷"
          forumContent="身為彩妝新手，還在努力學習階段，碰上好產品還是要分享的啦，本來就認為遮瑕是化妝"
        />
        <div className="col">
          {Array(4)
            .fill(1)
            .map((v, i) => {
              return (
                <SubForum
                  key={i}
                  number={i + 2}
                  forumTitle="新手也好用的遮瑕&遮瑕刷"
                  forumContent="身為彩妝新手，還在努力學習階段，碰上好產品還是要分享的啦，本來就認為遮瑕是化妝"
                />
              )
            })}
        </div>
      </div>
    </>
  )
}
