import { useState, useEffect, useRef } from 'react'
import { Bell, Check, Home, Upload, Clock, Menu, Camera } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import domtoimage from 'dom-to-image'
import './App.css'

// Custom Zelle-like Logo Component (avoiding trademark issues)
function CustomLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#6B46C1"/>
      <path d="M8 12L24 12L20 20L8 20L12 12Z" fill="white"/>
      <circle cx="20" cy="16" r="2" fill="#6B46C1"/>
    </svg>
  )
}

// Mobile Component
function MobileVersion({ formData, setFormData, isEditing, setIsEditing, currentTime, screenshotMode, setScreenshotMode, receiptRef, generateReceiptImage, handleInputChange }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div 
        ref={receiptRef} 
        className="w-[375px] bg-white relative overflow-hidden shadow-xl rounded-[30px]" 
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
        onClick={() => screenshotMode && setScreenshotMode(false)}
      >
        {/* iPhone Status Bar */}
        <div className="flex justify-between items-center px-4 py-2 text-black bg-white">
          <div className="flex items-center space-x-1">
            <div className="text-[17px] font-semibold">
              {currentTime}
            </div>
            {/* Location arrow icon */}
            <svg className="w-3 h-3 ml-1" viewBox="0 0 12 12" fill="black">
              <path d="M6 0L8 4H10L6 12L4 8H2L6 0Z"/>
            </svg>
          </div>
          <div className="flex items-center space-x-1">
            {/* Cellular signal bars */}
            <div className="flex space-x-[1px] items-end">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-2 bg-black rounded-full"></div>
              <div className="w-1 h-3 bg-black rounded-full"></div>
              <div className="w-1 h-4 bg-black rounded-full"></div>
            </div>
            {/* WiFi Icon */}
            <svg className="w-4 h-3 ml-1" viewBox="0 0 16 12" fill="none">
              <path d="M8 12C8.55 12 9 11.55 9 11C9 10.45 8.55 10 8 10C7.45 10 7 10.45 7 11C7 11.55 7.45 12 8 12Z" fill="black"/>
              <path d="M8 8C9.66 8 11.2 8.63 12.24 9.76L13.66 8.34C12.2 6.78 10.2 6 8 6C5.8 6 3.8 6.78 2.34 8.34L3.76 9.76C4.8 8.63 6.34 8 8 8Z" fill="black"/>
              <path d="M8 4C10.76 4 13.35 5.1 15.31 7.17L16.73 5.75C14.39 3.26 11.3 2 8 2C4.7 2 1.61 3.26 -0.73 5.75L0.69 7.17C2.65 5.1 5.24 4 8 4Z" fill="black"/>
            </svg>
            {/* Battery with percentage */}
            <div className="flex items-center ml-1">
              <div className="relative">
                <div className="w-6 h-3 border border-black rounded-sm bg-white">
                  <div className="w-5 h-2 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
                </div>
                <div className="w-0.5 h-1.5 bg-black rounded-r-sm absolute top-0.5 -right-0.5"></div>
              </div>
              <span className="text-[12px] font-medium ml-1">97</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-white">
          <div className="flex items-center space-x-3">
            <CustomLogo />
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-500" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-medium">2</span>
              </div>
            </div>
            <button className="text-[16px] font-medium text-gray-500">Sign off</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-4 bg-white">
          <h1 className="text-[28px] font-light text-black mb-8">Money sent</h1>

          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
              <Check className="w-8 h-8 text-white stroke-[3]" />
            </div>
          </div>

          {/* Recipient Info */}
          <div className="text-center mb-6">
            <div className="text-[18px] text-black mb-1">
              Sent to{' '}
              {isEditing ? (
                <Input
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange('recipientName', e.target.value)}
                  className="inline-block w-24 h-6 text-[18px] border-b border-black border-t-0 border-l-0 border-r-0 rounded-none px-1 bg-transparent focus:outline-none"
                />
              ) : (
                <span>{formData.recipientName}</span>
              )}
            </div>
            <div className="text-[14px] text-gray-500">
              Enrolled as{' '}
              {isEditing ? (
                <Input
                  value={formData.recipientEmail}
                  onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                  className="inline-block w-32 h-5 text-[14px] border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none px-1 bg-transparent focus:outline-none"
                />
              ) : (
                <span>{formData.recipientEmail}</span>
              )}
            </div>
          </div>

          {/* Amount */}
          <div className="text-center mb-6">
            <div className="text-[64px] font-thin text-black mb-2 leading-none">
              $
              {isEditing ? (
                <Input
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="inline-block w-48 h-16 text-[64px] font-thin border-b-2 border-black border-t-0 border-l-0 border-r-0 rounded-none px-2 bg-transparent focus:outline-none"
                />
              ) : (
                <span>{formData.amount}</span>
              )}
            </div>
            <div className="text-[18px] text-black">
              {isEditing ? (
                <Input
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-32 h-6 text-[18px] border-b border-black border-t-0 border-l-0 border-r-0 rounded-none px-1 bg-transparent text-center focus:outline-none"
                />
              ) : (
                <span>{formData.description}</span>
              )}
            </div>
          </div>

          {/* Availability Message */}
          <div className="text-center text-[14px] mb-8 text-gray-500">
            The money will be available in {formData.recipientName}'s<br />
            account typically within minutes
          </div>

          {/* Confirmation */}
          <div className="mb-8">
            <div className="text-[12px] font-medium mb-1 text-gray-400">CONFIRMATION</div>
            <div className="text-[18px] font-medium text-black">
              {isEditing ? (
                <Input
                  value={formData.confirmationCode}
                  onChange={(e) => handleInputChange('confirmationCode', e.target.value)}
                  className="w-40 h-6 text-[18px] border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none px-1 bg-transparent focus:outline-none"
                />
              ) : (
                formData.confirmationCode
              )}
            </div>
          </div>

          {/* Done Button - Show in screenshot mode */}
          {screenshotMode && (
            <div className="w-full py-3 rounded-full mb-4 text-[17px] font-medium border-2 text-center bg-transparent border-blue-500" style={{ color: '#007AFF' }}>
              Done
            </div>
          )}

          {/* Mobile Generate Image Button */}
          {!isEditing && !screenshotMode && (
            <Button 
              onClick={generateReceiptImage}
              className="w-full py-3 rounded-full mb-4 text-white font-medium text-[17px] flex items-center justify-center gap-2"
              style={{ backgroundColor: '#007AFF' }}
            >
              <Camera className="w-5 h-5" />
              Generate Receipt Image
            </Button>
          )}

          {/* Edit Toggle Button */}
          {!isEditing && !screenshotMode && (
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              className="w-full py-3 rounded-full mb-6 text-white font-medium text-[17px]"
              style={{ backgroundColor: '#6B46C1' }}
            >
              Edit Receipt
            </Button>
          )}
          
          {isEditing && !screenshotMode && (
            <Button 
              onClick={() => setIsEditing(false)}
              className="w-full py-3 rounded-full mb-6 text-white font-medium text-[17px]"
              style={{ backgroundColor: '#10B981' }}
            >
              Save Changes
            </Button>
          )}
        </div>

        {/* Bottom Navigation - Show in screenshot mode */}
        {screenshotMode && (
          <div className="border-t bg-white px-4 py-2 border-gray-200">
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center text-gray-500">
                <Home className="w-6 h-6 mb-1" />
                <span className="text-[10px]">Accounts</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <Upload className="w-6 h-6 mb-1" />
                <span className="text-[10px]">Deposit</span>
              </div>
              <div className="flex flex-col items-center" style={{ color: '#10B981' }}>
                <div className="relative">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: '#10B981' }}>
                    <span className="text-white text-[14px] font-bold">$</span>
                  </div>
                </div>
                <span className="text-[10px]">Pay & Transfer</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <Clock className="w-6 h-6 mb-1" />
                <span className="text-[10px]">Explore</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <Menu className="w-6 h-6 mb-1" />
                <span className="text-[10px]">Menu</span>
              </div>
            </div>
            <div className="w-32 h-1 bg-black rounded-full mx-auto mt-2"></div>
          </div>
        )}
      </div>

      {/* Instructions - Only show when editing */}
      {isEditing && (
        <div className="fixed top-4 left-4 right-4 max-w-sm mx-auto p-3 bg-black bg-opacity-90 text-white rounded-lg z-50">
          <h3 className="font-semibold mb-1 text-sm">Edit Mode</h3>
          <p className="text-xs">
            Tap any field to edit. Click "Save Changes" when done.
          </p>
        </div>
      )}
    </div>
  )
}

// Desktop Component
function DesktopVersion({ formData, setFormData, isEditing, setIsEditing, currentTime, receiptRef, generateReceiptImage, handleInputChange }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Zelle Receipt Generator</h1>
          <p className="text-gray-600">Create realistic fake Zelle receipts to waste scammers' time</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Controls */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Receipt Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Name</label>
                  <Input
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange('recipientName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                    placeholder="Enter recipient name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Email/Phone</label>
                  <Input
                    value={formData.recipientEmail}
                    onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                    placeholder="Enter email or phone"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($)</label>
                  <Input
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Input
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirmation Code</label>
                  <Input
                    value={formData.confirmationCode}
                    onChange={(e) => handleInputChange('confirmationCode', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                    placeholder="Enter confirmation code"
                  />
                </div>
              </div>

              <Button 
                onClick={generateReceiptImage}
                className="w-full mt-6 py-4 text-white font-semibold text-lg flex items-center justify-center gap-3"
                style={{ backgroundColor: '#007AFF' }}
              >
                <Camera className="w-6 h-6" />
                Generate Receipt Image
              </Button>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="flex justify-center">
            <div 
              ref={receiptRef} 
              className="w-[375px] bg-white relative overflow-hidden shadow-xl rounded-[30px] border-2 border-gray-200" 
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              {/* iPhone Status Bar */}
              <div className="flex justify-between items-center px-4 py-2 text-black bg-white">
                <div className="flex items-center space-x-1">
                  <div className="text-[17px] font-semibold">
                    {currentTime}
                  </div>
                  {/* Location arrow icon */}
                  <svg className="w-3 h-3 ml-1" viewBox="0 0 12 12" fill="black">
                    <path d="M6 0L8 4H10L6 12L4 8H2L6 0Z"/>
                  </svg>
                </div>
                <div className="flex items-center space-x-1">
                  {/* Cellular signal bars */}
                  <div className="flex space-x-[1px] items-end">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-2 bg-black rounded-full"></div>
                    <div className="w-1 h-3 bg-black rounded-full"></div>
                    <div className="w-1 h-4 bg-black rounded-full"></div>
                  </div>
                  {/* WiFi Icon */}
                  <svg className="w-4 h-3 ml-1" viewBox="0 0 16 12" fill="none">
                    <path d="M8 12C8.55 12 9 11.55 9 11C9 10.45 8.55 10 8 10C7.45 10 7 10.45 7 11C7 11.55 7.45 12 8 12Z" fill="black"/>
                    <path d="M8 8C9.66 8 11.2 8.63 12.24 9.76L13.66 8.34C12.2 6.78 10.2 6 8 6C5.8 6 3.8 6.78 2.34 8.34L3.76 9.76C4.8 8.63 6.34 8 8 8Z" fill="black"/>
                    <path d="M8 4C10.76 4 13.35 5.1 15.31 7.17L16.73 5.75C14.39 3.26 11.3 2 8 2C4.7 2 1.61 3.26 -0.73 5.75L0.69 7.17C2.65 5.1 5.24 4 8 4Z" fill="black"/>
                  </svg>
                  {/* Battery with percentage */}
                  <div className="flex items-center ml-1">
                    <div className="relative">
                      <div className="w-6 h-3 border border-black rounded-sm bg-white">
                        <div className="w-5 h-2 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
                      </div>
                      <div className="w-0.5 h-1.5 bg-black rounded-r-sm absolute top-0.5 -right-0.5"></div>
                    </div>
                    <span className="text-[12px] font-medium ml-1">97</span>
                  </div>
                </div>
              </div>

              {/* Header */}
              <div className="flex justify-between items-center px-4 py-3 bg-white">
                <div className="flex items-center space-x-3">
                  <CustomLogo />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Bell className="w-6 h-6 text-gray-500" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-medium">2</span>
                    </div>
                  </div>
                  <button className="text-[16px] font-medium text-gray-500">Sign off</button>
                </div>
              </div>

              {/* Main Content */}
              <div className="px-6 py-4 bg-white">
                <h1 className="text-[28px] font-light text-black mb-8">Money sent</h1>

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                    <Check className="w-8 h-8 text-white stroke-[3]" />
                  </div>
                </div>

                {/* Recipient Info */}
                <div className="text-center mb-6">
                  <div className="text-[18px] text-black mb-1">
                    Sent to <span>{formData.recipientName}</span>
                  </div>
                  <div className="text-[14px] text-gray-500">
                    Enrolled as <span>{formData.recipientEmail}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-center mb-6">
                  <div className="text-[64px] font-thin text-black mb-2 leading-none">
                    $<span>{formData.amount}</span>
                  </div>
                  <div className="text-[18px] text-black">
                    <span>{formData.description}</span>
                  </div>
                </div>

                {/* Availability Message */}
                <div className="text-center text-[14px] mb-8 text-gray-500">
                  The money will be available in {formData.recipientName}'s<br />
                  account typically within minutes
                </div>

                {/* Confirmation */}
                <div className="mb-8">
                  <div className="text-[12px] font-medium mb-1 text-gray-400">CONFIRMATION</div>
                  <div className="text-[18px] font-medium text-black">
                    {formData.confirmationCode}
                  </div>
                </div>

                {/* Done Button */}
                <div className="w-full py-3 rounded-full mb-4 text-[17px] font-medium border-2 text-center bg-transparent border-blue-500" style={{ color: '#007AFF' }}>
                  Done
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="border-t bg-white px-4 py-2 border-gray-200">
                <div className="flex justify-around items-center">
                  <div className="flex flex-col items-center text-gray-500">
                    <Home className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">Accounts</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-500">
                    <Upload className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">Deposit</span>
                  </div>
                  <div className="flex flex-col items-center" style={{ color: '#10B981' }}>
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: '#10B981' }}>
                        <span className="text-white text-[14px] font-bold">$</span>
                      </div>
                    </div>
                    <span className="text-[10px]">Pay & Transfer</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-500">
                    <Clock className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">Explore</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-500">
                    <Menu className="w-6 h-6 mb-1" />
                    <span className="text-[10px]">Menu</span>
                  </div>
                </div>
                <div className="w-32 h-1 bg-black rounded-full mx-auto mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [formData, setFormData] = useState({
    recipientName: 'Aaron',
    recipientEmail: 'AARON Z',
    amount: '120.00',
    description: 'Dog Sitting',
    confirmationCode: 'RP0RSJZ718A'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [screenshotMode, setScreenshotMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const receiptRef = useRef(null)

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      setIsMobile(mobileRegex.test(userAgent))
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
      setCurrentTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateReceiptImage = async () => {
    try {
      if (!receiptRef.current) {
        alert('Receipt not found. Please try again.')
        return
      }

      // For mobile, use a simpler approach
      if (isMobile) {
        // First, enter screenshot mode to show clean receipt
        setScreenshotMode(true)
        
        // Wait for the DOM to update
        await new Promise(resolve => setTimeout(resolve, 200))

        try {
          // Try to generate image with simplified options for mobile
          const canvas = await domtoimage.toPng(receiptRef.current, {
            quality: 0.8,
            bgcolor: '#ffffff',
            width: 375,
            style: {
              transform: 'scale(1)',
              transformOrigin: 'top left',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            },
            filter: (node) => {
              // Filter out any problematic nodes
              if (node.tagName === 'BUTTON' || node.tagName === 'INPUT') {
                return false
              }
              return true
            }
          })

          // Reset screenshot mode
          setScreenshotMode(false)

          // Create new tab with image
          const newTab = window.open()
          newTab.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Zelle Receipt</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { 
                    margin: 0; 
                    padding: 20px; 
                    background: #f0f0f0; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                    min-height: 100vh;
                    justify-content: center;
                  }
                  .instructions {
                    background: #333;
                    color: white;
                    padding: 20px;
                    border-radius: 25px;
                    margin-bottom: 20px;
                    font-size: 18px;
                    text-align: center;
                    max-width: 90%;
                    line-height: 1.4;
                  }
                  img { 
                    max-width: 100%; 
                    border: 1px solid #ddd; 
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    cursor: pointer;
                    width: 100%;
                    max-width: 375px;
                  }
                </style>
              </head>
              <body>
                <div class="instructions">
                  📱 Long-press the image below to save to your camera roll
                </div>
                <img src="${canvas}" alt="Zelle Receipt" />
              </body>
            </html>
          `)
        } catch (imageError) {
          console.error('Image generation failed:', imageError)
          setScreenshotMode(false)
          
          // Fallback: Show instructions for manual screenshot
          alert('📱 Image generation failed. Please use manual screenshot:\n\n1. The receipt is now in clean mode\n2. Take a screenshot using your phone\'s screenshot feature\n3. Usually: Power + Volume Up (iPhone) or Power + Volume Down (Android)\n4. Tap anywhere to restore the interface')
          return
        }
      } else {
        // Desktop version - use the existing logic
        const canvas = await domtoimage.toPng(receiptRef.current, {
          quality: 1,
          bgcolor: '#ffffff',
          width: 375,
          height: receiptRef.current.scrollHeight,
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left'
          }
        })

        const newTab = window.open()
        newTab.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Zelle Receipt</title>
              <style>
                body { 
                  margin: 0; 
                  padding: 20px; 
                  background: #f0f0f0; 
                  display: flex; 
                  flex-direction: column; 
                  align-items: center; 
                  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                }
                .instructions {
                  background: #333;
                  color: white;
                  padding: 10px 20px;
                  border-radius: 20px;
                  margin-bottom: 20px;
                  font-size: 14px;
                }
                img { 
                  max-width: 100%; 
                  border: 1px solid #ddd; 
                  border-radius: 10px;
                  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                }
              </style>
            </head>
            <body>
              <div class="instructions">
                📱 Mobile: Long-press image to save | 🖥️ Desktop: Right-click image to save
              </div>
              <img src="${canvas}" alt="Zelle Receipt" />
            </body>
          </html>
        `)
      }
    } catch (error) {
      console.error('Error generating image:', error)
      if (isMobile) {
        setScreenshotMode(false)
      }
      alert('Error generating image. Please try refreshing the page and try again.')
    }
  }

  // Render appropriate version based on device
  if (isMobile) {
    return (
      <MobileVersion 
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        currentTime={currentTime}
        screenshotMode={screenshotMode}
        setScreenshotMode={setScreenshotMode}
        receiptRef={receiptRef}
        generateReceiptImage={generateReceiptImage}
        handleInputChange={handleInputChange}
      />
    )
  }

  return (
    <DesktopVersion 
      formData={formData}
      setFormData={setFormData}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      currentTime={currentTime}
      receiptRef={receiptRef}
      generateReceiptImage={generateReceiptImage}
      handleInputChange={handleInputChange}
    />
  )
}

export default App

