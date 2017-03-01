## Asset Transfer Transaction

How Tx must be serialized to bytes.

|Order | Field       | Field Type     |         |
|------| ------------|-------------   | ------  |
|1 | Type            | Byte           |         |
|2 | Signature       | Byte[64]       |         |
|3 | Type            | Byte           | WTF ??? |
|4 | SenderPublicKey | Byte[32]       |         |
|5 | Asset ID        | 0x01 + Byte[32] or 0x00 | 0x00 in case of WAVES |
|6 | Fee Asset ID    | 0x01 + Byte[32] or 0x00 | 0x00 in case of WAVES |
|7 | Timestamp       | Byte[8]        |     |
|8 | Amount          | Byte[8]        |     |
|9 | Fee             | Byte[8]        |     |
|10| Recipient Address | Byte[26]     |     |
|11| Attachment Size  |   Byte[2]        | MAX = 140 |
|12| Attachment       | Byte[]        |     |


### Signing Data

[Type, SenderPublicKey, Asset ID, Fee Asset ID, Timestamp, Amount, Fee, Recipient Address, Attachment Size, Attachment]

Tx ID = Blake2b256 (Signing Data)
