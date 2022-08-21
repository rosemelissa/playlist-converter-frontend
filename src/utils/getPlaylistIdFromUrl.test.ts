import getPlaylistIdFromUrl from "./getPlaylistIdFromUrl";

test("Returns playlist id from url of playlist", () => {
  expect(
    getPlaylistIdFromUrl(
      "https://www.youtube.com/playlist?list=PLSCcAGyv98ifqwrlT8LUkh5liilnWrSVW"
    )
  ).toBe("PLSCcAGyv98ifqwrlT8LUkh5liilnWrSVW");
  expect(
    getPlaylistIdFromUrl(
      "https://www.youtube.com/playlist?list=PL5hrGMysD_GteOi3IYVbUHi1NV-aNSNWs"
    )
  ).toBe("PL5hrGMysD_GteOi3IYVbUHi1NV-aNSNWs");
});

test("Returns playlist id from one video in the playlist, even if the Url contains further text after the playlist id", () => {
  expect(
    getPlaylistIdFromUrl(
      "https://www.youtube.com/watch?v=lCg_gh_fppI&list=PLSCcAGyv98ifqwrlT8LUkh5liilnWrSVW"
    )
  ).toBe("PLSCcAGyv98ifqwrlT8LUkh5liilnWrSVW");
  expect(
    getPlaylistIdFromUrl(
      "https://www.youtube.com/watch?v=lCg_gh_fppI&list=PLSCcAGyv98ifqwrlT8LUkh5liilnWrSVW&index=2&t=2s"
    )
  ).toBe("PLSCcAGyv98ifqwrlT8LUkh5liilnWrSVW");
  expect(
    getPlaylistIdFromUrl(
      "https://www.youtube.com/watch?v=u6bF__ytLjI&list=PL5hrGMysD_GteOi3IYVbUHi1NV-aNSNWs"
    )
  ).toBe("PL5hrGMysD_GteOi3IYVbUHi1NV-aNSNWs");
});

test("Returns null when the url input is not valid", () => {
  expect(getPlaylistIdFromUrl("")).toBe(null);
  expect(getPlaylistIdFromUrl("not the right thing")).toBe(null);
});
