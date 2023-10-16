export default function FormBox({ title, children }) {
    return (
        <div className="flex flex-row items-center justify-start w-full mt-12 ml-8">
            <div className="text-black font-[400] text-[15px] w-[200px]">
                {title} <span className="text-[#FF0000]">*</span>
            </div>

            <div className="w-[300px]">{children}</div>
        </div>
    );
}
