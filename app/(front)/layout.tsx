import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function FrontLayout(props: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      <main className="flex-1">{props.children}</main>
      <Footer/>
    </div>
  );
}