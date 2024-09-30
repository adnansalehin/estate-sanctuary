import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload } from 'lucide-react'

type DocumentUploadProps = {
  isDarkTheme: boolean;
}

export function DocumentUpload({ isDarkTheme }: DocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleFileUpload = () => {
    if (selectedFile) {
      console.log(`Uploading file: ${selectedFile.name}`)
      // Implement actual file upload logic here
      setSelectedFile(null)
    }
  }

  return (
    <div className="mb-4">
      <Label htmlFor="file-upload">Upload Document</Label>
      <div className="flex gap-2 mt-1">
        <Input 
          id="file-upload" 
          type="file" 
          onChange={handleFileChange} 
          className={isDarkTheme ? "bg-[#024e52] text-white" : "bg-gray-100 text-[#024e52]"} 
        />
        <Button onClick={handleFileUpload} disabled={!selectedFile}>
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  )
}