import React from 'react'

export class ErrorBoundary extends React.Component<
  React.ComponentClass,
  { hasError: boolean }
> {
  public constructor(props: React.ComponentClass) {
    super(props)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }

  public componentDidCatch(error: any, errorInfo: any): void {
    console.error(error, errorInfo)
  }

  public render(): JSX.Element | any {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 15 }}>
          <div>Sorry, something went wrong. Please try to reload:</div>
        </div>
      )
    }

    return this.props.children
  }
}
