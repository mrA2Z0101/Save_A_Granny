import { useState, useEffect, useRef } from 'react'
import { Bell, Check, Home, Upload, Clock, Menu, Camera, CreditCard, Send, Activity, Settings, User } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import domtoimage from 'dom-to-image'
import './App.css'

// Generic Payment App Logo
function PaymentLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#0EA5E9"/>
      <path d="M8 10H24V14H8V10Z" fill="white"/>
      <path d="M8 16H20V20H8V16Z" fill="white"/>
      <circle cx="22" cy="18" r="2" fill="white"/>
    </svg>
  )
}

// Mobile Component
function MobileVersion({ formData, setFormData, isEditing, setIsEditing, currentTime, screenshotMode, setScreenshotMode, receiptRef, generateReceiptImage, handleInputChange }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div 
        ref={receiptRef} 
        className="w-[375px] bg-white relative overflow-hidden shadow-xl rounded-[25px]" 
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        onClick={() => screenshotMode && setScreenshotMode(false)}
      >
        {/* iPhone Status Bar */}
        <div className="flex justify-between items-center px-4 py-2 text-black bg-white">
          <div className="flex items-center space-x-1">
            <div className="text-[17px] font-semibold">
              {currentTime}
            </div>
            <svg className="w-3 h-3 ml-1" viewBox="0 0 12 12" fill="black">
              <path d="M6 0L8 4H10L6 12L4 8H2L6 0Z"/>
            </svg>
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-[1px] items-end">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-2 bg-black rounded-full"></div>
              <div className="w-1 h-3 bg-black rounded-full"></div>
              <div className="w-1 h-4 bg-black rounded-full"></div>
            </div>
            <svg className="w-4 h-3 ml-1" viewBox="0 0 16 12" fill="none">
              <path d="M8 12C8.55 12 9 11.55 9 11C9 10.45 8.55 10 8 10C7.45 10 7 10.45 7 11C7 11.55 7.45 12 8 12Z" fill="black"/>
              <path d="M8 8C9.66 8 11.2 8.63 12.24 9.76L13.66 8.34C12.2 6.78 10.2 6 8 6C5.8 6 3.8 6.78 2.34 8.34L3.76 9.76C4.8 8.63 6.34 8 8 8Z" fill="black"/>
              <path d="M8 4C10.76 4 13.35 5.1 15.31 7.17L16.73 5.75C14.39 3.26 11.3 2 8 2C4.7 2 1.61 3.26 -0.73 5.75L0.69 7.17C2.65 5.1 5.24 4 8 4Z" fill="black"/>
            </svg>
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

        {/* Simple Header */}
        <div className="bg-white px-4 py-3 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <PaymentLogo />
              <div>
                <div className="text-gray-800 font-semibold text-[16px]">QuickPay</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[8px] font-medium">3</span>
                </div>
              </div>
              <Settings className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Main Content - Different Structure */}
        <div className="px-6 py-6 bg-white">
          {/* Status Card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200">
            <div className="flex items-center justify-center mb-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-green-500">
                <Check className="w-7 h-7 text-white stroke-[2.5]" />
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="text-[24px] font-bold text-gray-800 mb-2">Transfer Successful</h1>
              <p className="text-[14px] text-gray-600">Your payment has been processed</p>
            </div>
          </div>

          {/* Transfer Details Card */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <h2 className="text-[16px] font-semibold text-gray-800 mb-4">Transfer Details</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 text-[14px]">Recipient</span>
                <span className="text-gray-900 font-medium text-[14px]">
                  {isEditing ? (
                    <Input
                      value={formData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      className="inline-block w-20 h-5 text-[14px] border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none px-1 bg-transparent focus:outline-none"
                    />
                  ) : (
                    formData.recipientName
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 text-[14px]">Account</span>
                <span className="text-gray-900 font-medium text-[14px]">
                  {isEditing ? (
                    <Input
                      value={formData.recipientEmail}
                      onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                      className="inline-block w-24 h-5 text-[14px] border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none px-1 bg-transparent focus:outline-none"
                    />
                  ) : (
                    formData.recipientEmail
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 text-[14px]">Purpose</span>
                <span className="text-gray-900 font-medium text-[14px]">
                  {isEditing ? (
                    <Input
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="inline-block w-24 h-5 text-[14px] border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none px-1 bg-transparent focus:outline-none"
                    />
                  ) : (
                    formData.description
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Amount Display - Different Style */}
          <div className="text-center mb-6">
            <div className="text-[48px] font-bold text-blue-600 mb-1 leading-none">
              $
              {isEditing ? (
                <Input
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="inline-block w-36 h-12 text-[48px] font-bold border-b-2 border-blue-400 border-t-0 border-l-0 border-r-0 rounded-none px-2 bg-transparent focus:outline-none text-blue-600"
                />
              ) : (
                formData.amount
              )}
            </div>
            <p className="text-[14px] text-gray-500">
              Funds will be available within 1-2 business days
            </p>
          </div>

          {/* Reference Number */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="text-[12px] font-medium text-blue-700 mb-1">REFERENCE NUMBER</div>
            <div className="text-[16px] font-mono text-blue-900">
              {isEditing ? (
                <Input
                  value={formData.confirmationCode}
                  onChange={(e) => handleInputChange('confirmationCode', e.target.value)}
                  className="w-32 h-5 text-[16px] font-mono border-b border-blue-400 border-t-0 border-l-0 border-r-0 rounded-none px-1 bg-transparent focus:outline-none text-blue-900"
                />
              ) : (
                formData.confirmationCode
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {screenshotMode && (
            <div className="flex space-x-3 mb-4">
              <button className="flex-1 py-3 rounded-xl text-[16px] font-medium bg-blue-500 text-white">
                Share Receipt
              </button>
              <button className="flex-1 py-3 rounded-xl text-[16px] font-medium border-2 border-blue-500 text-blue-500 bg-white">
                Close
              </button>
            </div>
          )}

          {!isEditing && !screenshotMode && (
            <Button 
              onClick={generateReceiptImage}
              className="w-full py-3 rounded-xl mb-4 text-white font-medium text-[16px] flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600"
            >
              <Camera className="w-5 h-5" />
              Generate Receipt Image
            </Button>
          )}

          {!isEditing && !screenshotMode && (
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              className="w-full py-3 rounded-xl mb-6 text-white font-medium text-[16px] bg-teal-500 hover:bg-teal-600"
            >
              Edit Details
            </Button>
          )}
          
          {isEditing && !screenshotMode && (
            <Button 
              onClick={() => setIsEditing(false)}
              className="w-full py-3 rounded-xl mb-6 text-white font-medium text-[16px] bg-green-500 hover:bg-green-600"
            >
              Save Changes
            </Button>
          )}
        </div>

        {/* Bottom Navigation - Different Icons and Layout */}
        {screenshotMode && (
          <div className="border-t bg-white px-4 py-3 border-gray-200">
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center text-gray-500">
                <CreditCard className="w-5 h-5 mb-1" />
                <span className="text-[10px]">Cards</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <Activity className="w-5 h-5 mb-1" />
                <span className="text-[10px]">Activity</span>
              </div>
              <div className="flex flex-col items-center text-blue-500">
                <div className="relative">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center mb-1 bg-blue-500">
                    <Send className="w-3 h-3 text-white" />
                  </div>
                </div>
                <span className="text-[10px]">Send</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <User className="w-5 h-5 mb-1" />
                <span className="text-[10px]">Profile</span>
              </div>
              <div className="flex flex-col items-center text-gray-500">
                <Menu className="w-5 h-5 mb-1" />
                <span className="text-[10px]">More</span>
              </div>
            </div>
            <div className="w-32 h-1 bg-black rounded-full mx-auto mt-2"></div>
          </div>
        )}
      </div>

      {/* Instructions */}
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">QuickPay Receipt Generator</h1>
          <p className="text-gray-600">Create realistic payment receipts for testing purposes</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Info</label>
                  <Input
                    value={formData.recipientEmail}
                    onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                    placeholder="Enter account info"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
                  <Input
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                    placeholder="Enter purpose"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reference Number</label>
                  <Input
                    value={formData.confirmationCode}
                    onChange={(e) => handleInputChange('confirmationCode', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                    placeholder="Enter reference number"
                  />
                </div>
              </div>

              <Button 
                onClick={generateReceiptImage}
                className="w-full mt-6 py-4 text-white font-semibold text-lg flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600"
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
              className="w-[375px] bg-white relative overflow-hidden shadow-xl rounded-[25px] border-2 border-gray-200" 
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              {/* Status Bar */}
              <div className="flex justify-between items-center px-4 py-2 text-black bg-white">
                <div className="flex items-center space-x-1">
                  <div className="text-[17px] font-semibold">{currentTime}</div>
                  <svg className="w-3 h-3 ml-1" viewBox="0 0 12 12" fill="black">
                    <path d="M6 0L8 4H10L6 12L4 8H2L6 0Z"/>
                  </svg>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-[1px] items-end">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-2 bg-black rounded-full"></div>
                    <div className="w-1 h-3 bg-black rounded-full"></div>
                    <div className="w-1 h-4 bg-black rounded-full"></div>
                  </div>
                  <svg className="w-4 h-3 ml-1" viewBox="0 0 16 12" fill="none">
                    <path d="M8 12C8.55 12 9 11.55 9 11C9 10.45 8.55 10 8 10C7.45 10 7 10.45 7 11C7 11.55 7.45 12 8 12Z" fill="black"/>
                    <path d="M8 8C9.66 8 11.2 8.63 12.24 9.76L13.66 8.34C12.2 6.78 10.2 6 8 6C5.8 6 3.8 6.78 2.34 8.34L3.76 9.76C4.8 8.63 6.34 8 8 8Z" fill="black"/>
                    <path d="M8 4C10.76 4 13.35 5.1 15.31 7.17L16.73 5.75C14.39 3.26 11.3 2 8 2C4.7 2 1.61 3.26 -0.73 5.75L0.69 7.17C2.65 5.1 5.24 4 8 4Z" fill="black"/>
                  </svg>
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

              {/* Simple Header */}
              <div className="bg-white px-4 py-3 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <PaymentLogo />
                    <div>
                      <div className="text-gray-800 font-semibold text-[16px]">QuickPay</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Bell className="w-5 h-5 text-gray-600" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-[8px] font-medium">3</span>
                      </div>
                    </div>
                    <Settings className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="px-6 py-6 bg-white">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center bg-green-500">
                      <Check className="w-7 h-7 text-white stroke-[2.5]" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h1 className="text-[24px] font-bold text-gray-800 mb-2">Transfer Successful</h1>
                    <p className="text-[14px] text-gray-600">Your payment has been processed</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 mb-6">
                  <h2 className="text-[16px] font-semibold text-gray-800 mb-4">Transfer Details</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-[14px]">Recipient</span>
                      <span className="text-gray-900 font-medium text-[14px]">{formData.recipientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-[14px]">Account</span>
                      <span className="text-gray-900 font-medium text-[14px]">{formData.recipientEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-[14px]">Purpose</span>
                      <span className="text-gray-900 font-medium text-[14px]">{formData.description}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-[48px] font-bold text-blue-600 mb-1 leading-none">
                    ${formData.amount}
                  </div>
                  <p className="text-[14px] text-gray-500">
                    Funds will be available within 1-2 business days
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="text-[12px] font-medium text-blue-700 mb-1">REFERENCE NUMBER</div>
                  <div className="text-[16px] font-mono text-blue-900">{formData.confirmationCode}</div>
                </div>

                <div className="flex space-x-3 mb-4">
                  <button className="flex-1 py-3 rounded-xl text-[16px] font-medium bg-blue-500 text-white">
                    Share Receipt
                  </button>
                  <button className="flex-1 py-3 rounded-xl text-[16px] font-medium border-2 border-blue-500 text-blue-500 bg-white">
                    Close
                  </button>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="border-t bg-white px-4 py-3 border-gray-200">
                <div className="flex justify-around items-center">
                  <div className="flex flex-col items-center text-gray-500">
                    <CreditCard className="w-5 h-5 mb-1" />
                    <span className="text-[10px]">Cards</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-500">
                    <Activity className="w-5 h-5 mb-1" />
                    <span className="text-[10px]">Activity</span>
                  </div>
                  <div className="flex flex-col items-center text-blue-500">
                    <div className="relative">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center mb-1 bg-blue-500">
                        <Send className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <span className="text-[10px]">Send</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-500">
                    <User className="w-5 h-5 mb-1" />
                    <span className="text-[10px]">Profile</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-500">
                    <Menu className="w-5 h-5 mb-1" />
                    <span className="text-[10px]">More</span>
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
    confirmationCode: 'QP7X9M2K8L'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [screenshotMode, setScreenshotMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const receiptRef = useRef(null)

  useEffect(() => {
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

      if (isMobile) {
        setScreenshotMode(true)
        await new Promise(resolve => setTimeout(resolve, 200))

        try {
          const canvas = await domtoimage.toPng(receiptRef.current, {
            quality: 0.8,
            bgcolor: '#ffffff',
            width: 375,
            style: {
              transform: 'scale(1)',
              transformOrigin: 'top left',
              fontFamily: 'Inter, system-ui, sans-serif'
            },
            filter: (node) => {
              if (node.tagName === 'BUTTON' || node.tagName === 'INPUT') {
                return false
              }
              return true
            }
          })

          setScreenshotMode(false)

          const newTab = window.open()
          newTab.document.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Payment Receipt</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { 
                    margin: 0; 
                    padding: 20px; 
                    background: #f0f0f0; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    font-family: Inter, system-ui, sans-serif;
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
                <img src="${canvas}" alt="Payment Receipt" />
              </body>
            </html>
          `)
        } catch (imageError) {
          console.error('Image generation failed:', imageError)
          setScreenshotMode(false)
          alert('📱 Image generation failed. Please use manual screenshot:\n\n1. The receipt is now in clean mode\n2. Take a screenshot using your phone\'s screenshot feature\n3. Usually: Power + Volume Up (iPhone) or Power + Volume Down (Android)\n4. Tap anywhere to restore the interface')
          return
        }
      } else {
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
              <title>Payment Receipt</title>
              <style>
                body { 
                  margin: 0; 
                  padding: 20px; 
                  background: #f0f0f0; 
                  display: flex; 
                  flex-direction: column; 
                  align-items: center; 
                  font-family: Inter, system-ui, sans-serif;
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
              <img src="${canvas}" alt="Payment Receipt" />
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

