import Image from 'next/image'
import Link from 'next/link'
import Componentstab from './_components/tab'
import SubForum from './_components/_component-main-page/forum/sub-forum'
import MainForum from './_components/_component-main-page/forum/main-forum'
import './_styles/main-page.css'

export default function Home() {
  const brands = [
    'Unleashia',
    'COSLORI',
    'MUZIGAE MANSION',
    'Rom&nd',
    'Kaja',
    "A'Piuw",
  ]
  return (
    <>
      <div>
        {/* banner */}
        <div className="banner-main-page" />
        {/* main page */}
        <section className="container section-main-page">
          {/* ---- START product ---- */}
          <section className="subsectoin-main-page">
            <h3>品牌暢銷商品</h3>
            <Componentstab items={brands} height={52} />
            <div />
            <button className="btn btn-primary">查看更多</button>
          </section>
          <section className="subsectoin-main-page">
            <h3>新進商品</h3>
            <Componentstab items={brands} height={52} />
            <div />
            <button className="btn btn-primary">查看更多</button>
          </section>
          {/* ---- END product ---- */}
          {/* ---- START main coupon ---- */}
          <section></section>
          {/* ---- END main coupon ---- */}
          {/* ---- START course ---- */}
          <section className="subsectoin-main-page">
            <h3>美妝課程</h3>
            <Componentstab items={brands} height={52} />
            <div />
            <button className="btn btn-primary">查看更多</button>
          </section>
          {/* ---- END course ---- */}
          {/* ---- START coupons ---- */}
          <section></section>
          {/* ---- END coupons ---- */}
          {/* ---- START forum ---- */}
          <section className="subsectoin-main-page">
            <h3>Top 文章</h3>
            <Componentstab items={['熱門', '最新']} height={52} />
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
            <button className="btn btn-primary">查看更多</button>
          </section>
          {/* ---- END forum ---- */}
        </section>
      </div>
    </>
  )
}
