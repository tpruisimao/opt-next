import type { NextPage } from "next";
import {
  Footer,
  Header as HeaderLib,
  HeaderProps,
  SearchOptionType,
} from "@truepill/optum-component-library";
import {
  useSubscription,
  HeaderStoreProvider,
  useHeaderStore,
  useSearch,
  useBannerVisibility,
  Status,
  getFooterContent,
  getHeaderContent,
} from "@truepill/optum-react-provider";

import "@truepill/optum-component-library/dist/index.min.css";
import { useHeaderContent } from "../content/header";
import { useState } from "react";
import { useFooterContent } from "../content/footer";
import { HeaderStoreProviderConfig } from "@truepill/optum-react-provider/dist/context/header/types";

function documentToReactComponents() {
  return (
    <p>
      Receive email updates from the Optum Store including promotions, deals and
      new products.
    </p>
  );
}

const mainConfig = {
  baseUrl: process.env.NEXT_PUBLIC_OPTUM_BACKEND_URL || "",
  authUrl: process.env.NEXT_PUBLIC_RALLY_BASE_URL || "",
};

function Header({ content }: { content: HeaderProps["content"] }) {
  const search = useSearch({ baseUrl: mainConfig.baseUrl });
  const [searchTerm, setSearchTerm] = useState("");
  const headerContent = useHeaderContent();
  const { state, actions } = useHeaderStore();
  const { state: isBannerVisible, mutation } = useBannerVisibility();

  const handleChange: HeaderProps["searchAutoCompleteProps"]["onChange"] = (
    e
  ) => {
    const value = e.target.value;
    setSearchTerm(value);
    search.get(value);
  };

  const handleSelect: HeaderProps["searchAutoCompleteProps"]["onSelect"] = (
    value,
    option
  ) => {
    setSearchTerm(value);
    window.open(option?.link, "_self");
  };

  function handleSearch(value: string) {
    if (!value) return;

    window.open(`/search?term=${value}`, "_self");
  }

  function handleOpenSearchDrawer() {
    search.reset();
    setSearchTerm("");
  }

  const handleSignOut: HeaderProps["onSignOut"] = () => {
    actions.signOut();
  };

  const handleClickCart: HeaderProps["onClickCartIcon"] = () => {
    window.open("/cart", "_slef");
  };

  const searchAutoComplete: HeaderProps["searchAutoCompleteProps"] = {
    // value: searchTerm,
    loading: search.status === Status.PENDING,
    hasNoResults:
      (search.status === Status.RESOLVED ||
        search.status === Status.REJECTED) &&
      !search.data?.categories.length &&
      !search.data?.matches.length,
    options: search.data,
    onSelect: handleSelect,
    onSubmitInput: handleSearch,
    onChange: handleChange,
  };

  function handleCloseBanner() {
    mutation();
  }

  function handleClickLink(link: string) {
    window.open(link, "_self");
  }

  function handleClickNotificationIcon() {
    window.open("/notification/inbox", "_self");
  }

  return (
    <HeaderLib
      {...headerContent}
      content={content}
      hasContentfulBanner={isBannerVisible}
      user={state.data?.user}
      cart={state.data?.cart}
      notifications={state.data?.notification}
      searchAutoCompleteProps={searchAutoComplete}
      onClickLink={handleClickLink}
      onSignOut={handleSignOut}
      onCloseBanner={handleCloseBanner}
      onClickCartIcon={handleClickCart}
      onClickNotificationIcon={handleClickNotificationIcon}
      onOpenSearchDrawer={handleOpenSearchDrawer}
      getOverlayContainer={() =>
        document.querySelector(".pusher.sidebar-pusher")
      }
    />
  );
}

const Home: NextPage = ({ footerContent, headerContent }: any) => {
  const { mutation } = useSubscription({ baseUrl: mainConfig.baseUrl });
  const content = useFooterContent();

  const featureFlags = {
    erectileDysfunction: true,
    birthControl: true,
    pharmacy: true,
    smsTermsConditions: true,
  };
  const config: HeaderStoreProviderConfig = {
    ...mainConfig,
    shouldRefreshToken: false,
    featureFlags: {
      userAccount: true,
    },
  };

  return (
    <div>
      <HeaderStoreProvider config={config}>
        <Header content={headerContent} />
      </HeaderStoreProvider>
      <div style={{ height: 500 }}>Body</div>
      <Footer
        onSubmitSubscription={mutation}
        featureFlags={featureFlags}
        content={footerContent || content}
        documentToReactComponents={documentToReactComponents}
      />
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const footerContent = await getFooterContent({
    space: process.env.NEXT_PUBLIC_SPACE as string,
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN as string,
  });

  const headerContent = await getHeaderContent({
    space: process.env.NEXT_PUBLIC_SPACE as string,
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN as string,
  });

  return {
    props: {
      footerContent: footerContent,
      headerContent: headerContent,
    }, // will be passed to the page component as props
  };
}
