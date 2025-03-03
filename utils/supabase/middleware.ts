import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // Create a NextResponse based on the incoming request
  let response = NextResponse.next({ request })

  // Initialize the Supabase client with your custom cookie handlers.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  try {
    // Use getUser to refresh the session and get the user data.
    const { data: { user } } = await supabase.auth.getUser()

    // If there’s no user and the request isn’t for a login-related page,
    // redirect to a landing or login page.
    if (
      !user &&
      !request.nextUrl.pathname.startsWith('/login') &&
      !request.nextUrl.pathname.startsWith('/auth')
    ) {
      const url = request.nextUrl.clone()
      url.pathname = '/landing'
      return NextResponse.redirect(url)
    }
  } catch (err) {
    console.error('Error refreshing token:', err)
    // If there was an error (likely due to a missing/invalid refresh token),
    // clear the stale auth cookies and force a sign-out.
    response.cookies.delete('sb-access-token')
    response.cookies.delete('sb-refresh-token')

    // Redirect to login so the user can sign in again.
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    // This matcher will exclude static files, images, etc.
    "/((?!_next/static|_next/image|favicon.ico|_vercel/speed-insights|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
