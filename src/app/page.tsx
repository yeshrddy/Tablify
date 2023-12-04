import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button asChild>
        <Link href="/users" >Login</Link>
      </Button>
    </main>
  )
}

// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/components/ui/use-toast"

// export default function Home() {
//   const { toast } = useToast();
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
//       <Button
//         variant="outline"
//         onClick={() => {
//           toast({
//             description: "Successfully logged in!",
//           })
//         }}
//       >
//         Login
//       </Button>
//     </main>
//   )
// }

