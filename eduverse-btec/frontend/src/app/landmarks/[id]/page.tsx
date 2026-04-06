export default function LandmarkDetailsPage({ params }: { params: { id: string } }) {
  return <main className="p-6">المعلم: {params.id}</main>
}
