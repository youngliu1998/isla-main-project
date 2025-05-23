'use client'

import React, { useState, useEffect, useRef } from 'react'
import ComponentsAvatar from '../../_components/avatar'
import { useRouter } from 'next/navigation'

export default function ComponentsAddChat({
  users = [
    { id: 1, nick: 'mandy', src: 'image_1.jpg' },
    { id: 2, nick: 'mandy', src: 'image_2.jpg' },
    { id: 3, nick: 'mandy', src: 'image_3.jpg' },
    { id: 4, nick: 'mandy', src: 'image_4.jpg' },
    { id: 5, nick: 'mandy', src: 'image_5.jpg' },
    { id: 6, nick: 'mandy', src: 'image_6.jpg' },
    { id: 7, nick: 'mandy', src: 'image_7.jpg' },
    { id: 8, nick: 'mandy', src: 'image_8.jpg' },
  ],
}) {
  //   const router = useRouter()
  const handleSubmit = () => {}
  const modalRef = useRef()
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="addChat"
          ref={modalRef}
          tabIndex={-1}
          aria-labelledby="addChatLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable modal-forum">
            <div className="modal-content bg-pure-white">
              <div className="modal-header main-color py-2">
                <h5
                  className="modal-title main-text-color fs20"
                  id="addChatLabel"
                >
                  新訊息
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body pt-2 d-flex flex-column">
                {users.map((user, i) => {
                  return (
                    <button
                      className="button-clear d-flex gap-3 align-items-center px-4 py-2 bg-hovering-gray"
                      onClick={() => {}}
                      key={i}
                    >
                      <ComponentsAvatar
                        src={user.src}
                        alt={user.nick}
                        classWidth="44"
                      />
                      <span>{user.nick}</span>
                      {/* <div className="ms-auto">o</div> */}
                      <i className="bi bi-circle ms-auto sub-text-color"></i>
                      {/* <ComponentsAuthorInfo
                        authorID={user.id}
                        width="40"
                        src={user.src}
                        alt={user.nick}
                        fontSize="16"
                        color="var(--main-text-color)"
                        authorName={user.nick}
                      /> */}
                    </button>
                  )
                })}
              </div>
              <div className="modal-footer d-flex px-3 py-2">
                <button
                  type="button-bounce"
                  data-bs-dismiss="modal"
                  className={`px-4 py-2 rounded-3 border-0 bounce flex-grow-1 bg-main text-white`}
                  onClick={() => {}}
                >
                  聊天
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
