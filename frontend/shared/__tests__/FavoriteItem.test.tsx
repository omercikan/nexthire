import { render, RenderResult, screen } from "@testing-library/react";
import { FavoriteField } from "@/shared/types/favorite";
import { Provider } from "react-redux";
import { store } from "@/shared/redux/store";
import { AuthContext } from "@/features/auth/authContext";
import useFavoriteCompany from "../hooks/favorite-company/useFavoriteCompany";
import FavoriteItem from "../components/FavoriteItem";

//? Mock useFavoriteCompany hook solutions (For testing) ?//
jest.mock("../../shared/hooks/favorite-company/useFavoriteCompany");
const mockAddFavoriteCompany = jest.fn();

//? Mock Firebase solutions (For testing) ?//
jest.mock("../../app/api/firebase/firebaseConfig", () => ({
  auth: {},
  db: {},
  provider: {
    setCustomParameters: jest.fn(),
  },
}));

//? Mock favorite data ?//
const mockFavoriteData = {
  dataField: {
    postID: "2109830912",
    companyLocation: "İstanbul",
    numberOfEmployees: "100",
    companyLogo:
      "https://res.cloudinary.com/dvolwkh6r/image/upload/v1745622792/N_2_1_regutc.png",
    companyName: "NextHire",
  },
  postID: "2109830912",
};

//? Mock sample user ?//
const mockUser = (role: string) => {
  const data = {
    createdAt: new Date(),
    updatedAt: new Date(),
    fullname: "Ömer Çıkan",
    email: "example@gmail.com",
    emailVerified: true,
    _id: "302049328",
    name: "Ömer",
    phoneNumber: "0555 555 55 55",
    role: role,
  };

  return data;
};

const renderComponent = (
  role: string | undefined,
  updatedData = {}
): RenderResult => {
  (useFavoriteCompany as jest.Mock).mockReturnValue({
    addFavoriteCompany: mockAddFavoriteCompany,
    result: {
      originalArgs: {},
      isLoading: false,
    },
    updatedData,
  });

  const userData = mockUser(role as string);

  return render(
    <Provider store={store}>
      <AuthContext value={{ user: userData }}>
        <FavoriteItem
          data={mockFavoriteData}
          fieldName={FavoriteField.Jobs}
          extraField="Full Stack Developer"
        />
      </AuthContext>
    </Provider>
  );
};

describe("FavoriteCompany Component test group", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Button visibility based on user role", () => {
    test("button is hidden because user role employer", () => {
      renderComponent("employer");
      const button = screen.queryByRole("button");
      expect(button).toBeNull();
    });

    test("button is visible because user role candidate", () => {
      renderComponent("candidate");
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    test("user is not logged in and show the button?", () => {
      renderComponent(undefined);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  describe("Favorite icon state", () => {
    test("isFavorited = false; and test id GoBookmark visible", () => {
      renderComponent("candidate", {
        [FavoriteField.Jobs]: [],
      });
      expect(screen.getByTestId("GoBookmark"));
    });

    test("isFavorited = true; and test id GoBookmarkFill visible", () => {
      renderComponent("candidate", {
        [FavoriteField.Jobs]: [{ postID: "2109830912" }],
      });
      expect(screen.getByTestId("GoBookmarkFill")).toBeInTheDocument();
    });
  });

  describe("Loading state behavior", () => {
    test("user is click favorite icon and match id and loading state is true showing Circular Progress", () => {
      (useFavoriteCompany as jest.Mock).mockReturnValue({
        addFavoriteCompany: mockAddFavoriteCompany,
        result: {
          originalArgs: { postID: "2109830912" },
          isLoading: true,
        },
        updatedData: {},
      });

      const userData = mockUser("candidate");

      render(
        <AuthContext.Provider value={{ user: userData }}>
          <FavoriteItem
            data={mockFavoriteData}
            fieldName={FavoriteField.Jobs}
            extraField="Full Stack Developer"
          />
        </AuthContext.Provider>
      );
      expect(screen.getByTestId("CircularProgress"));
    });
  });
});
