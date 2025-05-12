'use client'

export default function UserMenu({ OpenMenu = false, setOpenMenu = () => {} }) {
  return (
    <>
      <button
        className="user-menu-head"
        onClick={() => {
          setOpenMenu(!OpenMenu)
        }}
      >
        會員選單
      </button>
    </>
  )
}
