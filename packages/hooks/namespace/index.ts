const default_prix = 'zl-'

export function usenamespace(id: string) {
    const className=default_prix + id
    return {       
        namespace: 
            {
                className: className,
                bs: (type: string) => {
                    return className + ' '+ type
                }
            }
        
    }
}
export default usenamespace