export const fetchTutors = async (params = {}) => {
  const query = new URLSearchParams();
  
  


  if (typeof params === 'string') {
    query.append('search', params);
  } else {
    if (params.searchTerm) query.append('search', params.searchTerm);
      if (params.startDateGte) query.append('startDateGte', params.startDateGte);
    if (params.startDateLte) query.append('startDateLte', params.startDateLte);
  }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors?${query.toString()}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error(`Failed to fetch tutors: ${res.status}`);
    const data = await res.json();
  return data || [];
};


export const fetchFeaturedTutors = async () => {
 


  const urls = [
    `${process.env.NEXT_PUBLIC_API_URL}/tutors/featured`,
    `${process.env.NEXT_PUBLIC_API_URL}/tutors?featured=true`,
    `${process.env.NEXT_PUBLIC_API_URL}/tutors?limit=3`,
  ];



  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
        if (data?.tutors?.length > 0) return data.tutors;
      }
    } catch {
      

    }
  }
    return [];
};