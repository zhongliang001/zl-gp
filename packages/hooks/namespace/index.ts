const default_prix = 'zl-'

export function usenamespace() {
    return {
        namespace: (id: string)=>{
            return default_prix + id
        }
    }
}
export default usenamespace