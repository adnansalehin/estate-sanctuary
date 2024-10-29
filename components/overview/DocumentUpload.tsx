import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

type DocumentUploadProps = {
  isDarkTheme: boolean;
}

export function DocumentUpload({ isDarkTheme }: DocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // Generate a stable ID that will be consistent between server and client
  const uploadId = "document-upload-input"

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
      <Label htmlFor={uploadId}>Upload Document</Label>
      <div className="flex gap-2 mt-1">
        <Input 
          id={uploadId}
          type="file" 
          onChange={handleFileChange} 
          className={cn(
            "file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0",
            "file:text-sm file:font-semibold",
            isDarkTheme 
              ? "bg-[#024e52] text-white file:bg-[#013639] file:text-white" 
              : "bg-gray-100 text-[#024e52] file:bg-[#024e52] file:text-white"
          )}
        />
        <Button 
          onClick={handleFileUpload} 
          disabled={!selectedFile}
          type="button"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </div>
    </div>
  )
}