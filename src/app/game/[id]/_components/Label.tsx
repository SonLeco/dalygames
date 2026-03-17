interface LabelProps {
    name: string;
}

export function Label({ name }: LabelProps){
    return (
        <div>
            <span className='bg-slate-200 text-black text-xs px-2 py-1 rounded-md'>{name}</span>
        </div>
    )
}