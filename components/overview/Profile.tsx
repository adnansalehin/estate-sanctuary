import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DocumentType } from "@/app/types"
type ProfileProps = {
  currentStage: number;
  isDarkTheme: boolean;
  documents: DocumentType[];
}

export function Profile({ currentStage, isDarkTheme, documents }: ProfileProps) {
  const filteredDocuments = documents.filter(doc => doc.stage <= currentStage + 1 && doc.uploader === "Buyer")

  return (
    <Card className={isDarkTheme ? "bg-[#013639] text-white" : "bg-white text-[#024e52]"}>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className={isDarkTheme ? "text-gray-300" : "text-gray-600"}>Buyer</p>
          </div>
        </div>
        <h4 className="text-lg font-semibold mb-4">Your Documents</h4>
        <ul className="space-y-4">
          {filteredDocuments.map((doc, index) => (
            <li key={index} className={`flex items-center gap-4 p-4 border ${isDarkTheme ? 'border-gray-600' : 'border-gray-200'} rounded-lg`}>
              {doc.icon}
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Uploaded by: {doc.uploader}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}