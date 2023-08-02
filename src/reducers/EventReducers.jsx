import { data } from "../data";
export const initialState = {
  data: data.meetups,
  filteredData: data.meetups.map((event) => ({ ...event, rsvp: false })),
  sortBy: "Both",
  searchValue: "",
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "FILTER_BY":
      return {
        ...state,
        filteredData: state.data.filter((data) =>
          payload === "Both" ? data : data.eventType === payload
        ),
      };

    case "SEARCH_BY":
      return {
        ...state,
        filteredData: state.data.filter(
          (data) =>
            data.title.toLowerCase().includes(payload.toLowerCase().trim()) ||
            data.eventType.toLowerCase().includes(payload.toLowerCase().trim())
        ),
      };

    case "RSVP":
      return {
        ...state,
        filteredData: state.filteredData.map((event) =>
          event.id === payload
            ? { ...event, rsvp: true }
            : { ...event, rsvp: false }
        ),
      };

    default:
      return state;
  }
};
