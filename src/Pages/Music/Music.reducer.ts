import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";

interface music {
  isLoadingMusic: boolean;
  data: { resultCount: number, results: IMusic[] };
  isError: boolean;
}

export interface IMusic {
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  collectionArtistId: number;
  collectionArtistViewUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  previewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  trackRentalPrice: number;
  collectionHdPrice: number;
  trackHdPrice: number;
  trackHdRentalPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackNumber: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  longDescription: string;
  hasITunesExtras: boolean;
}

const initialState: music = {
  isLoadingMusic: false,
  data: { resultCount: 0, results: [] },
  isError: false,
}

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMusicList.pending, (state) => {
      state.isLoadingMusic = true;
    })
    builder.addCase(getMusicList.fulfilled, (state, { payload }) => {
      if (payload) {
        state.data = payload;
      }
      state.isLoadingMusic = false;
    })
    builder.addCase(getMusicList.rejected, (state) => {
      state.isError = true;
    })
  }
})

export const getMusicList = createAsyncThunk(
  'music/getList',
  async (payload?: { search?: string, limit: number },) => {
    try {
      const { data } = await axios.get(`https://itunes.apple.com/search?term=${payload?.search}&limit=${payload?.limit}`)
      return data;
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.response.data,
      });
    }
  }
);

export default musicSlice.reducer;
