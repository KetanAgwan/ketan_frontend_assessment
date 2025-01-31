export const handleDomainSubmit = async (
    values,
    domainData,
    { updateDomain, createDomain, onSuccess }
  ) => {
    const createdDate = Math.floor(Date.now() / 1000);
    const fullDomain = `${values.protocol}${values.domain}`;
    const { protocol, ...rest } = values;

    const formData = { ...rest, domain: fullDomain };

    let response;
    if (domainData) {
      response = await updateDomain({ id: domainData.id, ...formData });
    } else {
      response = await createDomain({ ...formData, createdDate });
    }

    if (response.data && onSuccess) {
      onSuccess();
    }

    return response;
  };