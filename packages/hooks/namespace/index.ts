const default_prix = 'zl-'

export function usenamespace(id: string) {
  const className = default_prix + id
  return {
    namespace: {
      className: className,
      bs: (type?: string) => {
        return className + ' ' + type
      },
      cs: (name: string) => {
        return className + '-' + name
      },
      size: (size: string | undefined) => {
        if (size === 'normal') {
          return ''
        }
        if (size) {
          return id + '-' + size
        }
      }
    }
  }
}
export default usenamespace
