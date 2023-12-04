import { User, columns } from "./columns"
import { DataTable } from "./DataTable"

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  let data = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
  return await data.json()
}

export default async function DemoPage() {
  const data = await getData()
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
