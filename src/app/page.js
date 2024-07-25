import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import Sectionheaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 mt-4}" id={"about"}>
        <Sectionheaders subHeader="Our story" mainHeader="About us" />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            itaque laborum nihil assumenda ipsum unde, quae earum optio atque
            nesciunt laudantium voluptas qui nemo sapiente a repellat aut
            debitis eum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            itaque laborum nihil assumenda ipsum unde, quae earum optio atque
            nesciunt laudantium voluptas qui nemo sapiente a repellat aut
            debitis eum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            itaque laborum nihil assumenda ipsum
          </p>
        </div>
      </section>
      <section className="text-center my-8" id={"contact"}>
        <Sectionheaders subHeader="Don't hesistate" mainHeader="Contact us" />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +46 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}
