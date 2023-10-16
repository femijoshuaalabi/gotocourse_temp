export default function TextInput({ type = 'input', ...props }) {
    return (
        <>
            {type == 'input' ? (
                <input
                    className=" w-[343px] h[50px] border-[1px] border-[#0C2191] py-3 px-2 text-start"
                    type="text"
                    {...props}
                />
            ) : (
                <textarea
                    className="w-[343px] h[180px] border-[1px] border-[#0C2191] py-3 px-2 text-start"
                    {...props}
                ></textarea>
            )}
        </>
    );
}
