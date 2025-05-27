import { ContentLayout } from '@/components/admin-panel/content-layout'

export default function Home() {
  return (
    <ContentLayout title="ISLA 管理" description="管理內頁">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">主頁</h1>
        <p className="text-gray-600"></p>
      </div>
    </ContentLayout>
  )
}
