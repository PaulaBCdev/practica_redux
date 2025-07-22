import "./not-found-page.css";
import { useNavigate } from "react-router";
import Page from "../../components/layout/page";
import Button from "../../components/ui/button";
import Layout from "../../components/layout/layout";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true });
  };
  return (
    <Layout>
      <Page title="404 - Page not found">
        <div className="error-div">
          <p className="error-p">
            We apologize, but the page you are looking for does not exist or has
            been moved.
          </p>
          <Button className="erro-btn" onClick={handleClick}>
            Ads page
          </Button>
        </div>
      </Page>
    </Layout>
  );
};

export default NotFoundPage;
