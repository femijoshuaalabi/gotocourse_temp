import Nav from './Nav';

export default function Header({ page, noNavigation }) {
    return (
        <>
            <div className="fixed left-[350px] top-0 pt-6 pb-[15px] right-0 bg-[#fff] z-[99999]">
                {page != 1 ? (
                    <div
                        className="shadow-md h-[70px] bg-[#ececec] flex justify-start items-center pl-[20px] pr-[20px]"
                        style={{ borderBottom: '1px solid #f4f4f4', zIndex: 99 }}
                    >
                        <div className="text-black text-[32px] font-[600] ml-14">EXCEL BASICS</div>
                        <div className="text-black text-[32px] font-[600] ml-4">#1123</div>
                    </div>
                ) : (
                    <div className="h-[70px]"></div>
                )}
                {!noNavigation && <Nav />}
            </div>
        </>
    );
}
