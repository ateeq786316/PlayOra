import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, isAdmin } from '../services/authService'
import { useToast } from '../hooks/use-toast'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser()
        const admin = await isAdmin()
        
        if (user && admin) {
          setIsAuthorized(true)
        } else {
          toast({
            title: "Access Denied",
            description: "You must be an admin to access this page.",
            variant: "destructive"
          })
          navigate('/login')
        }
      } catch (error) {
        toast({
          title: "Authentication Error",
          description: "Failed to verify your credentials. Please try again.",
          variant: "destructive"
        })
        navigate('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [navigate, toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return isAuthorized ? <>{children}</> : null
}

export default ProtectedRoute